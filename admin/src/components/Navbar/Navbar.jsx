import React, { useContext } from 'react'
import  './Navbar.css'
import {assets} from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const { isAdmin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  return (
    <div className='navbar'>
    <img className='logo' src={assets.logo} alt=""/>
    <div className="navbar-right">
      {isAdmin ? (
        <button className="navbar-auth-btn navbar-logout-btn" onClick={() => { logout(); navigate('/list'); }}>
          Logout
        </button>
      ) : (
        <button className="navbar-auth-btn navbar-login-btn" onClick={() => navigate('/login')}>
          Admin Login
        </button>
      )}
      <img className='profile' src={assets.profile_image} alt=""/>
    </div>
    </div>
  )
}

export default Navbar