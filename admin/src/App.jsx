import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'
import DemoBanner from './components/DemoBanner/DemoBanner'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext'


const App = () => {

  // const url = "http://localhost:4000"
  const url = "https://food-del-backend-jy0v.onrender.com"
  const { isAdmin, adminToken } = useContext(AdminContext);

  return (
    <div>
      <ToastContainer/>
      <DemoBanner/>
      <Navbar/>
        <hr/>
        <div className='app-content'>
          <Sidebar/>
          <Routes>
            <Route path = "/add" element = {<Add url = {url} isAdmin={isAdmin} adminToken={adminToken}/>}/>
            <Route path = "/list" element = {<List url = {url} isAdmin={isAdmin} adminToken={adminToken}/>}/>
            <Route path = "/orders" element = {<Orders url = {url} isAdmin={isAdmin} adminToken={adminToken}/>}/>
            <Route path = "/login" element = {<Login url = {url}/>}/>
          </Routes>
        </div>
    </div>
  )
}

export default App