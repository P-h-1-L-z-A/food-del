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







import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { getTotalCartAmount,token,setToken } = useContext(StoreContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (e, sectionId, menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

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
      <Link to='/' onClick={() => setMobileMenuOpen(false)}>
        <img src={assets.logo} alt="" className='logo' />
      </Link>
      
      <ul className={`navbar-menu ${mobileMenuOpen ? 'mobile-show' : ''}`}>
        <Link to='/' onClick={() => { setMenu("home"); setMobileMenuOpen(false); }} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={(e) => handleAnchorClick(e, 'explore-menu', 'menu')} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={(e) => handleAnchorClick(e, 'app-download', 'mobile-app')} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={(e) => handleAnchorClick(e, 'footer', 'contact-us')} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>

      <div className='navbar-right'>
        <label className="toggle-button">
          <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
          <span className="slider">
            <div className="moon"><img src={assets.moon} alt="Dark Mode" /></div>
            <div className="sun"><img src={assets.sun} alt="Light Mode" /></div>
          </span>
        </label>

        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}> Sign in </button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => { navigate('/myorders'); setMobileMenuOpen(false); }}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr/>
              <li onClick={() => { logout(); setMobileMenuOpen(false); }} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}

        {/* Hamburger Icon for Mobile */}
        <button className="navbar-hamburger" onClick={() => setMobileMenuOpen(prev => !prev)} aria-label="Toggle Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Navbar
