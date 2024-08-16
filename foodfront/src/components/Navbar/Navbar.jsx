// import React, { useContext, useState } from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/assets'
// import { Link } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';

// const Navbar = ({setShowLogin}) => {

//   const[menu,setMenu] = useState("home");

//   const{getTotalCartAmount} = useContext(StoreContext);





  
//   return (
//     <div className='navbar'>
//       <Link to='/'><img src = {assets.logo}  alt = "" className='logo'></img></Link>
//       <ul className='navbar-menu'>
//         <Link to='/' onClick={() => {setMenu("home")}} className={menu==="home"?"active":""}>home</Link>
//         <a href='#explore-menu' onClick={() => {setMenu("menu")}} className={menu==="menu"?"active":""}>menu</a>
//         <a href='#app-download' onClick={() => {setMenu("mobile-app")}} className={menu==="mobile-app"?"active":""}>mobile-app</a>
//         <a href='#footer' onClick={() => {setMenu("contact-us")}} className={menu==="contact-us"?"active":""}>contact us</a>
//       </ul>
//       <div className='navbar-right'>
//         <img src = { assets.search_icon} alt = ""/>
//         <div className='navbar-search-icon'>
//           <Link to='/cart'><img src  = { assets.basket_icon} alt = ""/></Link>
//           <div className={getTotalCartAmount()===0?"":"dot"}></div>
//         </div>
//         <button onClick={()=>{ setShowLogin(true)}}> Sign in </button>
//       </div>
//     </div>
//   )
// }

// export default Navbar







import React, { Profiler, useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const [theme, setTheme] = useState("light");

  const { getTotalCartAmount,token,setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
  }

  const toggleTheme = () => {
    if (theme === "light") {
      document.body.classList.add("dark-theme");
      setTheme("dark");
    }else if(theme === "dark")  {
      document.body.classList.remove("dark-theme");
      setTheme("light");
    }
  };

  
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => { setMenu("home") }} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu") }} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => { setMenu("mobile-app") }} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => { setMenu("contact-us") }} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className='navbar-right'>
        <label className="toggle-button">
          <input type="checkbox" onChange={toggleTheme} />
          <span className = "slider">
          {theme==="light" ?
          <div className= "moon"><img src={assets.moon} alt="" /></div>:
          <div className= "sun"><img src={assets.sun} alt="" /></div>
          }
          </span>
        </label>

        {/* <button className= "icon" onClick={toggleTheme}>
          
          {theme === "light" ? <img src={assets.sun} alt=""/> : <img src={assets.moon} alt=""/> }
        </button> */}

        {/* <Link to='/order'><img src={assets.search_icon} alt="" /></Link> */}
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token?<button onClick={() => { setShowLogin(true) }}> Sign in </button>:
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className='nav-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr/>
            <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>}
        
      </div>
    </div>
  )
}

export default Navbar
