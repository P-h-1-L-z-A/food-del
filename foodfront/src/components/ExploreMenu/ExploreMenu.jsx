import React, { useRef, useState, useEffect } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  const listRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for precision
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollBy = (offset) => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className='explore-menu' id='explore-menu'>
    <h1>Your Menu</h1>
    <p className='explore-menu-text'>Choose from variety of different food depending on your taste buds </p>
    <div className="explore-menu-wrapper">
      {canScrollLeft && (
        <div className="scroll-arrow scroll-left" onClick={() => scrollBy(-200)}>
          &#10094;
        </div>
      )}
      <div className='explore-menu-list' ref={listRef} onScroll={checkScroll}>
          {menu_list.map((item,index)=>{
              return (
                  <div onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)
                  }} key = {index} className = 'explore-menu-list-item'>
                  <img className={category===item.menu_name?"active":"" }src ={ item.menu_image} alt="" />
                  <p>{item.menu_name}</p>
                  </div>
          )
          })}
      </div>
      {canScrollRight && (
        <div className="scroll-arrow scroll-right" onClick={() => scrollBy(200)}>
          &#10095;
        </div>
      )}
    </div>
    <hr/>
    </div>
  )
}

export default ExploreMenu