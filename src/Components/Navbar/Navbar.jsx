import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import nav_dropdown from "../assets/burger_menu.png"; // Ensure this path is correct and you have a burger icon image
import { Link } from "react-router-dom";
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  // State for tracking the active menu item (for the underline)
  const [menu, setMenu] = useState("shop");
  // State for toggling the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Get cart item count from context
  const { getTotalCartItems } = useContext(ShopContext);
  // Ref for the mobile menu UL element (to detect clicks outside)
  const menuRef = useRef();
  // Ref for the mobile menu toggle button (to detect clicks outside)
  const menuToggleRef = useRef();

  // Function to handle clicks on menu items
  const handleMenuItemClick = (menuItem) => {
    setMenu(menuItem); // Update the active menu state
    setIsMenuOpen(false); // Close the mobile menu
  };

  // Function to toggle the mobile menu open/closed
  const dropdown_toggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Effect to handle closing the mobile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the menu is open and the click was outside the menu element
      // AND also outside the toggle button element
      if (
        isMenuOpen && // Only run if the menu is open
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Close the menu
      }
    };
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function to remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // Dependencies for the effect: only re-run if these refs or state change
  }, [menuRef, menuToggleRef, isMenuOpen]);


  return (
    // Use semantic <nav> element for the main navigation bar
    <nav className="navbar" aria-label="Main Navigation">

      {/* Logo section, linked to the homepage */}
      <Link to="/" className="nav-logo-link" onClick={() => handleMenuItemClick("shop")}>
        <div className="nav-logo">
          <img src={logo} alt="Shopper Logo" />
          <p>SHOPPER</p>
        </div>
      </Link>

      {/* Burger Icon Button - visible only on mobile via CSS */}
      <button
        ref={menuToggleRef} // Assign ref to the toggle button
        className='nav-dropdown-toggle' // Specific class for styling the button
        onClick={dropdown_toggle} // Toggle function on click
        aria-label="Toggle navigation menu" // Accessibility: Describes the button's purpose
        aria-expanded={isMenuOpen} // Accessibility: Indicates if the controlled element (menu) is open
        aria-controls="main-nav-menu" // Accessibility: Links this button to the menu it controls
      >
        {/* Image for the burger icon */}
        {/* Alt text is empty because the button itself has an aria-label */}
        <img src={nav_dropdown} alt="" />
      </button>

      {/* Main Navigation Menu List */}
      <ul
        id="main-nav-menu" // ID matches aria-controls on the button
        ref={menuRef} // Assign ref to the menu list
        // Dynamically add 'nav-menu-active' class based on state for CSS targeting
        className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}
      >
        {/* Menu Item: Shop */}
        <li onClick={() => handleMenuItemClick("shop")}>
          <Link to="/">Shop</Link>
          {/* Conditional rendering of the underline */}
          {menu === "shop" && <hr />}
        </li>
        {/* Menu Item: Men */}
        <li onClick={() => handleMenuItemClick("mens")}>
          <Link to="/mens">Men</Link>
          {menu === "mens" && <hr />}
        </li>
        {/* Menu Item: Women */}
        <li onClick={() => handleMenuItemClick("womens")}>
          <Link to="/womens">Women</Link>
          {menu === "womens" && <hr />}
        </li>
        {/* Menu Item: Kids */}
        <li onClick={() => handleMenuItemClick("kids")}>
          <Link to="/kids">Kids</Link>
          {menu === "kids" && <hr />}
        </li>

         {/* Mobile Login Button - appears inside the dropdown menu */}
         {/* This list item is hidden/shown via CSS */}
         <li className="nav-menu-login-mobile">
            {/* Link is styled like a button via CSS */}
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
         </li>
      </ul>

      {/* Login and Cart Section */}
      <div className="nav-login-card">

        {/* Desktop Login Button - hidden on mobile via CSS */}
        <Link to="/login" className="nav-login-desktop">
          {/* Explicitly set type="button" */}
          <button type="button">Login</button>
        </Link>

        {/* Cart Icon Link - Now contains both the image AND the count */}
        <Link to="/cart" className="cart-icon-link" onClick={() => setIsMenuOpen(false)}>
          <img src={cart_icon} alt="Cart" /> {/* Cart image */}

          {/* Cart Item Count Display - MOVED INSIDE the Link */}
          {/* Now its position: absolute will be relative to cart-icon-link */}
          {/* aria-live="polite" helps screen readers announce changes in the count */}
          <div className="nav-cart-count" aria-live="polite">
            {getTotalCartItems()}
          </div>
        </Link> {/* The Link now correctly wraps both elements */}

      </div> {/* Closing tag for nav-login-card */}
    </nav> // Closing tag for the <nav> element
  );
};

export default Navbar;
