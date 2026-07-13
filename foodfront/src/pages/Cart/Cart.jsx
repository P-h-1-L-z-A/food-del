import React, { useContext, useState } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = ({ setShowLogin }) => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token, promoCode, setPromoCode, promoDiscount, setPromoDiscount } = useContext(StoreContext)

  const [promoInput, setPromoInput] = useState("");
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!token) {
      alert("Please login to proceed to checkout");
      setShowLogin(true);
    } else {
      navigate('/order');
    }
  }

  const applyPromoCode = () => {
    if (promoInput === "FREEDEL") {
      setPromoCode("FREEDEL");
      setPromoDiscount(5); // Assuming delivery fee is $5
      alert("Promo code applied! Free delivery.");
    } else {
      setPromoCode("");
      setPromoDiscount(0);
      alert("Code is either invalid or has expired");
    }
  }

  return (
    <div className='cart'>
      {getTotalCartAmount() === 0 ? (
        <div className='cart-empty'>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Browse our menu to find something delicious!</p>
          <button onClick={() => navigate('/')}>Browse Menu</button>
        </div>
      ) : (
        <>
          <div className='cart-items'>
            <div className='cart-items-title'>
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className='cart-items-title cart-items-item'>
                      <img src={url+"/images/"+item.image} alt='' />
                      <p>{item.name}</p>
                      <p>$ {item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>$ {item.price * cartItems[item._id]}</p>
                      <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                    </div>
                    <hr />
                  </div>
                )
              }
            })}
          </div>

          <div className='cart-bottom'>
            <div className='cart-total'>
              <h2>Cart Total</h2>
              <div>
                <div className='cart-total-details'>
                  <p>SubTotal</p>
                  <p>$ {getTotalCartAmount()}</p>
                </div>
                <hr/>
                <div className='cart-total-details'>
                  <p>Delivery Fee</p>
                  <p>$ {getTotalCartAmount()===0?0:5}</p>
                </div>
                <hr/>
                <div className='cart-total-details'>
                  <b> Total </b>
                  <b>$ {getTotalCartAmount()===0?0:getTotalCartAmount()+5-promoDiscount}</b>
                </div>
              </div>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
            <div className='cart-promocode'>
              <p>Have a promo code, Enter here:</p>
              <div className='cart-promocode-input'>
                <input type="text" placeholder='promo-code' value={promoInput} onChange={(e) => setPromoInput(e.target.value)} />
                <button onClick={applyPromoCode}>Submit</button>
              </div>
              {promoCode && <p style={{color: 'green', marginTop: '10px'}}>Active Promo: {promoCode}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart