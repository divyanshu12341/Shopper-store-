// import React, { useContext } from "react";
// import "./ProductDisplay.css";
// import star_icon from '../assets/star_icon.png'
// import star_dull_icon from '../assets/star_dull_icon.png'
// import { ShopContext } from "../../Context/ShopContext";
// const ProductDisplay = (props) => {
//   const { product } = props;
//   const {addToCart} = useContext(ShopContext);
//   const {removeFromCart} = useContext(ShopContext);
//   return (
//     <div className="productdisplay">
//       <div className="productdisplay-left">
//         <div className="productdisplay-img-list">
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//         </div>
//         <div className="productdisplay-img">
//           <img className="productdisplay-main-img" src={product.image} alt="" />
//         </div>
//       </div>
//       <div className="productdisplay-right">
//         <h1>{product.name}</h1>
//         <div className="productdisplay-right-stars">
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_dull_icon} alt="" />
//           <p>(122)</p>
//         </div>
//         <div className="productdisplay-right-prices">
//             <div className="productdisplay-right-price-old">
//                 ${product.old_price}
//             </div>
//             <div className="productdisplay-right-price-new">
//                 ${product.new_price}
//             </div>
//         </div>
//         <div className="productdisplay-right-description">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, id. Dignissimos quaerat aliquam eum.
//         </div>
//         <div className="productdisplay-right-size">
//             <h1>Select size</h1>
//             <div className="productdisplay-right-size">
//                 <div>S</div>
//                 <div>M</div>
//                 <div>L</div>
//                 <div>XL</div>
//                 <div>XXL</div>
//             </div>
//         </div>
//         <button onClick = {()=>{addToCart(product.id)}}>Add to Cart</button>
//         <p className="productdisplay-right-category">
//             <span>Category: </span>
//             <span>Women, T-Shirt, Crop-top </span>
//             <span></span>
//         </p>
//         <p className="productdisplay-right-category">
//             <span>Tags: </span>
//             <span>Modern, Latest </span>
//             <span></span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProductDisplay;


import React, { useContext, useState, useEffect } from "react"; // Added useState, useEffect
import "./ProductDisplay.css"; // Keep the CSS import
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  // const {removeFromCart} = useContext(ShopContext); // Commented out as it's unused

  // --- State for Interactivity ---
  // State to track the currently displayed main image
  // Initialize with the primary product image or the first image if available
  const [mainImage, setMainImage] = useState(product.image);
  // State to track the selected size
  const [selectedSize, setSelectedSize] = useState(null); // Initially no size selected

  // --- Effect to update main image if product changes ---
  useEffect(() => {
    // If the product prop changes, reset the main image to the new product's image
    setMainImage(product.image);
    setSelectedSize(null); // Also reset selected size when product changes
  }, [product]); // Dependency array includes product

  // --- Event Handlers ---
  // Handle clicking on a thumbnail image
  const handleThumbnailClick = (imageSrc) => {
    setMainImage(imageSrc); // Update the main image state
  };

  // Handle clicking on a size option
  const handleSizeClick = (size) => {
    setSelectedSize(size); // Update the selected size state
  };

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    if (selectedSize) {
      // console.log(`Adding product ${product.id} with size ${selectedSize} to cart.`);
      addToCart(product.id, selectedSize); // Pass product ID and selected size
    } else {
      // Optionally provide feedback if no size is selected
      alert("Please select a size first.");
    }
  };

  // --- Mock Data/Placeholders (Replace with actual product data structure) ---
  // Assuming product.images is an array of image URLs for thumbnails
  const thumbnailImages = product.images || [product.image, product.image, product.image, product.image];
  // Assuming product.sizes is an array of available sizes
  const availableSizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  // Assuming product.description is available
  const description = product.description || "A comfortable and stylish item perfect for any occasion. Made with high-quality materials.";
  // Assuming product.rating and product.reviewCount are available
  const rating = product.rating || 4;
  const reviewCount = product.reviewCount || 122;


  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        {/* Image Thumbnail List */}
        <div className="productdisplay-img-list">
          {/* Map over the thumbnail images */}
          {thumbnailImages.map((imgSrc, index) => (
            <img
              key={index} // Add a key for list items
              src={imgSrc}
              alt={`${product.name} thumbnail ${index + 1}`} // Improved alt text
              onClick={() => handleThumbnailClick(imgSrc)} // Set main image on click
              // Add 'active' class if this thumbnail matches the current main image
              className={mainImage === imgSrc ? 'active' : ''}
            />
          ))}
        </div>
        {/* Main Image Container - Matches CSS class */}
        {/* Changed from productdisplay-img to productdisplay-main-img-container */}
        <div className="productdisplay-main-img-container">
          <img
            className="productdisplay-main-img"
            src={mainImage} // Use state variable for the image source
            alt={product.name} // Improved alt text
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        {/* Star Rating */}
        <div className="productdisplay-right-stars">
          {/* Render stars based on rating - Example logic */}
          {[...Array(5)].map((_, i) => (
            <img key={i} src={i < rating ? star_icon : star_dull_icon} alt={i < rating ? "Star" : "Empty Star"} />
          ))}
          <p>({reviewCount})</p> {/* Use dynamic review count */}
        </div>
        {/* Prices */}
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
                ${product.old_price}
            </div>
            <div className="productdisplay-right-price-new">
                ${product.new_price}
            </div>
        </div>
        {/* Description */}
        <div className="productdisplay-right-description">
            {description} {/* Use dynamic description */}
        </div>
        {/* Size Selection */}
        {/* Corrected structure: Outer div with heading, inner div for sizes */}
        <div className="productdisplay-right-size"> {/* Container for heading + sizes */}
            <h1>Select size</h1>
            <div className="productdisplay-right-sizes"> {/* Container for size boxes */}
                {/* Map over available sizes */}
                {availableSizes.map((size) => (
                    <div
                        key={size} // Add key
                        onClick={() => handleSizeClick(size)} // Set selected size on click
                        // Add 'selected' class if this size matches the current selected size
                        className={selectedSize === size ? 'selected' : ''}
                    >
                        {size}
                    </div>
                ))}
            </div>
        </div>
        {/* Add to Cart Button */}
        <button onClick={handleAddToCart} disabled={!selectedSize}> {/* Disable button if no size selected */}
          Add to Cart
        </button>
        {/* Category & Tags */}
        {/* Use dynamic data if available */}
        <p className="productdisplay-right-category">
            <span>Category: </span>
            <span>{product.category || "Women, T-Shirt, Crop-top"}</span>
        </p>
        <p className="productdisplay-right-category">
            <span>Tags: </span>
            <span>{product.tags || "Modern, Latest"}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
