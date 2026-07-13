import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from 'react'
import { assets } from "../../assets/assets"

const Orders = ({ url, isAdmin, adminToken }) => {

  const [orders, setOrders] = useState([]);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [orderToClose, setOrderToClose] = useState(null);
  const [closeComments, setCloseComments] = useState("");

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);

    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async(event,orderId)=>{
    if (!isAdmin) {
      toast.error("Demo mode: Updating status is disabled. Login as admin to use this feature.");
      return;
    }
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    }, {
      headers: { token: adminToken }
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  const handleCloseOrder = async () => {
    try {
      const response = await axios.post(url + "/api/order/close", {
        orderId: orderToClose,
        comments: closeComments
      }, {
        headers: { token: adminToken }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setCloseModalOpen(false);
        setOrderToClose(null);
        setCloseComments("");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error closing order");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+","+order.address.state+","+order.address.country+","+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <div className="order-price-promo">
              <p>${order.amount}</p>
              {order.promoCode && <span className="promo-badge">Promo: {order.promoCode}</span>}
            </div>
            <select
              onChange={(event)=>statusHandler(event,order._id)}
              value = {order.status}
              disabled={!isAdmin}
              className={!isAdmin ? 'order-select-disabled' : ''}
              title={!isAdmin ? 'Login as admin to update status' : ''}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            {order.status === "Delivered" && isAdmin && (
              <button 
                className="close-order-btn" 
                onClick={() => { setOrderToClose(order._id); setCloseModalOpen(true); }}
              >
                Close the order
              </button>
            )}
          </div>
        ))}
      </div>

      {closeModalOpen && (
        <div className="close-order-modal-overlay">
          <div className="close-order-modal">
            <h4>Close Order</h4>
            <p>Are you sure you want to close this order?</p>
            <textarea 
              placeholder="Any comments..." 
              value={closeComments}
              onChange={(e) => setCloseComments(e.target.value)}
            />
            <div className="close-order-modal-actions">
              <button className="btn-yes" onClick={handleCloseOrder}>Yes</button>
              <button className="btn-no" onClick={() => { setCloseModalOpen(false); setOrderToClose(null); setCloseComments(""); }}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders