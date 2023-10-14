import React, { useState, useRef, useEffect } from 'react';
import './HamburgerMenu.css'; // Create a CSS file for styling the hamburger menu
import { Link } from 'react-router-dom';
import './OverallStyleSheet.css';
import { useAccountContext } from './AccountContext';

const HamburgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showServicesSubMenu, setShowServicesSubMenu] = useState(false);
  const [showFirearmsSubMenu, setShowFirearmsSubMenu] = useState(false);
  const [showPartsSubMenu, setShowPartsSubMenu] = useState(false);
  const { state } = useAccountContext();

  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu if clicked outside
      }
    }

    // Attach the event listener when the menu is open
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleHamburgerClick = (event) => {
    event.stopPropagation();
    handleMenuToggle();
  };

  const handleServicesSubMenuToggle = () => {
    setShowServicesSubMenu(!showServicesSubMenu);
  };

  const handleFirearmsSubMenuToggle = () => {
    setShowFirearmsSubMenu(!showFirearmsSubMenu);
  };

  const handlePartsSubMenuToggle = () => {
    setShowPartsSubMenu(!showPartsSubMenu);
  };


  if (state.isAuthenticated) {
  return (
    <div>
      {/* Hamburger icon */}
      <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={handleHamburgerClick}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Menu content */}
      <div className={`menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <ul>
          <li className='menu-line'><Link to="/">Home</Link></li>
          <li className='menu-line'><Link to="/AboutUs">About Us</Link></li>
          <li className='menu-line'><Link to="/FFL Transfers">FFL Transfers</Link></li>          
          <li className='menu-line'><Link to="/HowItWorks">How it Works</Link></li>
          <li onClick={handleServicesSubMenuToggle} className='menu-line'>
            <Link to="/Services">Services</Link>
            <span className={`caret ${showServicesSubMenu ? 'down' : 'up'}`}></span>
          </li>
          {showServicesSubMenu && (
            <ul className="sub-menu">
              <li><Link to="Services">Service 1</Link></li>
              <li><Link to="Services">Service 2</Link></li>
              <li><Link to="Services">Service 3</Link></li>
            </ul>
          )}
          <li onClick={handlePartsSubMenuToggle} className='menu-line'>
            <Link to="/Parts">Parts</Link>
            <span className={`caret ${showPartsSubMenu ? 'down' : 'up'}`}></span>
          </li>
          {showPartsSubMenu && (
            <ul className="sub-menu">
              <li><Link to="/Parts">Rifle Parts</Link></li>
              <li><Link to="/Parts">AR-15 and AR-10 Parts</Link></li>
              <li><Link to="/Parts">Handgun and AR Pistol Parts</Link></li>
              <li><Link to="/Parts">Shotgun Parts</Link></li>
              <li><Link to="/Parts">Lever Action Parts</Link></li>
            </ul>
          )}
          <li onClick={handleFirearmsSubMenuToggle} className='menu-line'>
            <Link to="/GunList">Firearms</Link>
            <span className={`caret ${showFirearmsSubMenu ? 'down' : 'up'}`}></span>
          </li>
          {showFirearmsSubMenu && (
            <ul className="sub-menu">
              <li><Link to="/GunList">Rifles</Link></li>
              <li><Link to="/GunList">AR-15s and AR-10s</Link></li>
              <li><Link to="/GunList">Hanguns and AR Pistols</Link></li>
              <li><Link to="/GunList">Shotguns</Link></li>
            </ul>
          )}
          <li className='menu-line'><Link to="/Accessories">Accessories</Link></li>
          <li className='menu-line'><Link to="/Sell">Sell</Link></li>
          <li className='menu-line'><Link to="/ContactUs">Contact Us</Link></li>
          <li className='menu-line'><Link to="/Profile">Profile</Link></li>
          {/*<li className='menu-line'><Link to="/APItest">API Test Page</Link></li>*/}
        </ul>
      </div>
    </div>
  );
}; return (
  <div>
    {/* Hamburger icon */}
    <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={handleHamburgerClick}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>

    {/* Menu content */}
    <div className={`menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
      <ul>
        <li className='menu-line'><Link to="/">Home</Link></li>
        <li className='menu-line'><Link to="/AboutUs">About Us</Link></li>
        <li className='menu-line'><Link to="/FFL Transfers">FFL Transfers</Link></li>
        <li className='menu-line'><Link to="/HowItWorks">How it Works</Link></li>
        <li onClick={handleServicesSubMenuToggle} className='menu-line'>
          <Link to="/Services">Services</Link>
          <span className={`caret ${showServicesSubMenu ? 'down' : 'up'}`}></span>
        </li>
        {showServicesSubMenu && (
          <ul className="sub-menu">
            <li><Link to="Services">Service 1</Link></li>
            <li><Link to="Services">Service 2</Link></li>
            <li><Link to="Services">Service 3</Link></li>
          </ul>
        )}
        <li onClick={handlePartsSubMenuToggle} className='menu-line'>
          <Link to="/Parts">Parts</Link>
          <span className={`caret ${showPartsSubMenu ? 'down' : 'up'}`}></span>
        </li>
        {showPartsSubMenu && (
          <ul className="sub-menu">
            <li><Link to="/Parts">Rifle Parts</Link></li>
            <li><Link to="/Parts">AR-15 and AR-10 Parts</Link></li>
            <li><Link to="/Parts">Handgun and AR Pistol Parts</Link></li>
            <li><Link to="/Parts">Shotgun Parts</Link></li>
            <li><Link to="/Parts">Lever Action Parts</Link></li>
          </ul>
        )}
        <li onClick={handleFirearmsSubMenuToggle} className='menu-line'>
          <Link to="/GunList">Firearms</Link>
          <span className={`caret ${showFirearmsSubMenu ? 'down' : 'up'}`}></span>
        </li>
        {showFirearmsSubMenu && (
          <ul className="sub-menu">
            <li><Link to="/GunList">Rifles</Link></li>
            <li><Link to="/GunList">AR-15s and AR-10s</Link></li>
            <li><Link to="/GunList">Hanguns and AR Pistols</Link></li>
            <li><Link to="/GunList">Shotguns</Link></li>
          </ul>
        )}
        <li className='menu-line'><Link to="/Accessories">Accessories</Link></li>
        <li className='menu-line'><Link to="/Sell">Sell</Link></li>
        <li className='menu-line'><Link to="/ContactUs">Contact Us</Link></li>
        {/*<li className='menu-line'><Link to="/APItest">API Test Page</Link></li>*/}
      </ul>
    </div>
  </div>
  );

        };

export default HamburgerMenu;
