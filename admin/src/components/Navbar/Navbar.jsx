import React, { useContext, useState } from 'react'
import  './Navbar.css'
import {assets} from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const { isAdmin, logout } = useContext(AdminContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      document.body.classList.add("dark-theme");
      setTheme("dark");
    } else {
      document.body.classList.remove("dark-theme");
      setTheme("light");
    }
  };

  return (
    <div className='navbar'>
    <img className='logo' src={assets.logo} alt=""/>
    <div className="navbar-right">
      <label className="toggle-button">
        <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
        <span className="slider">
          <div className="moon"><img src={assets.moon} alt="Dark Mode" /></div>
          <div className="sun"><img src={assets.sun} alt="Light Mode" /></div>
        </span>
      </label>
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