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
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const [theme, setTheme] = useState("light");

  const { getTotalCartAmount } = useContext(StoreContext);

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
      <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => { setMenu("home") }} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu") }} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => { setMenu("mobile-app") }} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => { setMenu("contact-us") }} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className='navbar-right'>
        <button className= "icon" onClick={toggleTheme}>
          {/* {theme === "light" ? "Dark " : "Light"} */}
          {theme === "light" ? <img src={assets.sun} alt=""/> : <img src={assets.moon} alt=""/> }
        </button>
        <Link to='/order'><img src={assets.search_icon} alt="" /></Link>
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => { setShowLogin(true) }}> Sign in </button>
      </div>
    </div>
  )
}

export default Navbar
