// // import React, { useContext, useState } from "react";
// // import "./Navbar.css";
// // import logo from "../assets/logo.png";
// // import cart_icon from "../assets/cart_icon.png";
// // import { Link } from "react-router-dom";
// // import { ShopContext } from '../../Context/ShopContext';

// // const Navbar = () => {
// //   const [menu, setMenu] = useState("shop");
// //   const {getTotalCartItems} = useContext(ShopContext);
// //   return (
// //     <div className="navbar">
// //       <div className="nav-logo">
// //         <img src={logo} alt="website banner" />
// //         <p>SHOPPER</p>
// //       </div>
// //       <ul className="nav-menu">
// //         <li
// //           onClick={() => {
// //             setMenu("shop");
// //           }}
// //         >
// //           {" "}
// //           <Link to="/"> Shop </Link>
// //           {menu === "shop" ? <hr /> : <></>}
// //         </li>
// //         <li
// //           onClick={() => {
// //             setMenu("mens");
// //           }}
// //         >
// //           {" "}
// //           <Link to="/mens"> Men </Link> {menu === "mens" ? <hr /> : <></>}
// //         </li>
// //         <li
// //           onClick={() => {
// //             setMenu("womens");
// //           }}
// //         >
// //           {" "}
// //           <Link to="/womens">Women</Link>
// //           {menu === "womens" ? <hr /> : <></>}
// //         </li>
// //         <li
// //           onClick={() => {
// //             setMenu("kids");
// //           }}
// //         >
// //           <Link to="/kids">Kids</Link>
// //           {menu === "kids" ? <hr /> : <></>}
// //         </li>
// //       </ul>
// //       <div className="nav-login-card">
// //         <Link to="/login">
// //           <button>Login</button>
// //         </Link>
// //         <Link to="/cart">
// //           <img src={cart_icon} alt="Cart Icon" />
// //         </Link>
// //         <div className="nav-cart-count">{getTotalCartItems()}</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;


// import React, { useContext, useState, useRef, useEffect } from "react";
// import "./Navbar.css";
// import logo from "../assets/logo.png";
// import cart_icon from "../assets/cart_icon.png";
// import nav_dropdown from "../assets/burger_menu.png"; // Assuming you have a dropdown/burger icon
// import { Link } from "react-router-dom";
// import { ShopContext } from '../../Context/ShopContext';

// const Navbar = () => {
//   const [menu, setMenu] = useState("shop");
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
//   const { getTotalCartItems } = useContext(ShopContext);
//   const menuRef = useRef(); // Ref for the menu UL

//   // Function to handle menu item clicks (closes mobile menu)
//   const handleMenuItemClick = (menuItem) => {
//     setMenu(menuItem);
//     setIsMenuOpen(false); // Close menu on item click
//   };

//   // Toggle function for the burger icon
//   const dropdown_toggle = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Optional: Close menu if clicked outside (basic implementation)
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         // Check if the click target is NOT the toggle button itself
//         if (!event.target.closest('.nav-dropdown-icon')) {
//            setIsMenuOpen(false);
//         }
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [menuRef]);


//   return (
//     <div className="navbar">
//       <Link to="/" className="nav-logo-link" style={{ textDecoration: 'none' }}> {/* Wrap logo in Link */}
//         <div className="nav-logo">
//           <img src={logo} alt="Shopper Logo" />
//           <p>SHOPPER</p>
//         </div>
//       </Link>

//       {/* Burger Icon - visible only on mobile */}
//       <img
//         className='nav-dropdown-icon'
//         onClick={dropdown_toggle}
//         src={nav_dropdown} // Use your burger/dropdown icon here
//         alt="Menu Toggle"
//       />

//       {/* Navigation Menu */}
//       {/* Add 'nav-menu-active' class when isMenuOpen is true */}
//       <ul ref={menuRef} className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
//         <li onClick={() => handleMenuItemClick("shop")}>
//           <Link to="/">Shop</Link>
//           {menu === "shop" ? <hr /> : null}
//         </li>
//         <li onClick={() => handleMenuItemClick("mens")}>
//           <Link to="/mens">Men</Link>
//           {menu === "mens" ? <hr /> : null}
//         </li>
//         <li onClick={() => handleMenuItemClick("womens")}>
//           <Link to="/womens">Women</Link>
//           {menu === "womens" ? <hr /> : null}
//         </li>
//         <li onClick={() => handleMenuItemClick("kids")}>
//           <Link to="/kids">Kids</Link>
//           {menu === "kids" ? <hr /> : null}
//         </li>
//          {/* Optionally move Login button inside mobile menu */}
//          <li className="nav-menu-login-mobile">
//             <Link to="/login" onClick={() => setIsMenuOpen(false)}>
//               <button>Login</button>
//             </Link>
//          </li>
//       </ul>

//       {/* Login and Cart */}
//       <div className="nav-login-card">
//         {/* Hide standard login button on smaller screens if moved to menu */}
//         <Link to="/login" className="nav-login-desktop">
//           <button>Login</button>
//         </Link>
//         <Link to="/cart" className="cart-icon-link" onClick={() => setIsMenuOpen(false)}> {/* Close menu if cart clicked */}
//           <img src={cart_icon} alt="Cart Icon" />
//         </Link>
//         <div className="nav-cart-count">{getTotalCartItems()}</div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


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

        {/* Cart Icon Link */}
        <Link to="/cart" className="cart-icon-link" onClick={() => setIsMenuOpen(false)}>
          <img src={cart_icon} alt="Cart" /> {/* Clearer alt text */}
        </Link>

        {/* Cart Item Count Display */}
        {/* aria-live="polite" helps screen readers announce changes in the count */}
        <div className="nav-cart-count" aria-live="polite">{getTotalCartItems()}</div>
      </div>
    </nav> // Closing tag for the <nav> element
  );
};

export default Navbar;
