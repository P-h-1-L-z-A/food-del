import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"

const List = ({url, isAdmin, adminToken}) => {

  // const url = 'http://localhost:4000'
  const [list,setList] = useState([]);

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId)=>{
    if (!isAdmin) {
      toast.error("Demo mode: Removing items is disabled. Login as admin to use this feature.");
      return;
    }
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId}, {
      headers: { token: adminToken }
    })
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchList();
  },[])


  
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              {isAdmin ? (
                <p onClick={()=>removeFood(item._id)} className='cursor list-delete-btn'>X</p>
              ) : (
                <p className='list-delete-disabled' title="Login as admin to delete items">X</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List