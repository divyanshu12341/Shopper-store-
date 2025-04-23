import React, { useContext } from 'react';
import './CartItems.css';
// Corrected casing for ShopContext import
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png';

// ... rest of the component code
const CartItems = () => {
    // Destructure all needed values from context
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    // Defensive check: Ensure context values are loaded before proceeding
    // This might indicate a loading state is needed if context loads asynchronously
    if (!all_product || !cartItems || !getTotalCartAmount || !removeFromCart) {
        // Optionally return a loading indicator or null
        console.warn("ShopContext values not fully loaded in CartItems.");
        return <div>Loading cart...</div>; // Or return null;
    }

    // Calculate the total amount once
    const totalAmount = getTotalCartAmount();

    // Filter products that are actually in the cart to map over
    // This can be slightly more efficient than mapping all products and checking inside
    const itemsInCart = all_product.filter(product => product && cartItems[product.id] > 0);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {/* Map only over items actually in the cart */}
            {itemsInCart.length > 0 ? (
                itemsInCart.map((e) => {
                    // Calculate item total safely
                    const itemTotal = (typeof e.new_price === 'number' && typeof cartItems[e.id] === 'number')
                        ? (e.new_price * cartItems[e.id]).toFixed(2)
                        : 'N/A'; // Handle potential non-numeric values

                    return (
                        // Use React.Fragment for key when div isn't needed, or keep div
                        <React.Fragment key={e.id}>
                            <div className='cartitems-format cartitems-format-main'>
                                <img src={e.image} alt={e.name || 'Product Image'} className='carticon-product-icon' />
                                <p>{e.name || 'N/A'}</p>
                                <p>${typeof e.new_price === 'number' ? e.new_price.toFixed(2) : 'N/A'}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${itemTotal}</p>
                                <img
                                    className='cartitems-remove-icon'
                                    src={remove_icon}
                                    onClick={() => { removeFromCart(e.id) }}
                                    alt={`Remove ${e.name || 'item'}`} // More descriptive alt text
                                    role="button" // Indicate it's interactive
                                    tabIndex={0} // Make it focusable
                                    onKeyPress={(event) => { // Allow removal with Enter key
                                        if (event.key === 'Enter') {
                                            removeFromCart(e.id);
                                        }
                                    }}
                                />
                            </div>
                            <hr />
                        </React.Fragment>
                    );
                })
            ) : (
                <p className="cartitems-empty-message">Your cart is empty.</p> // Show a message if cart is empty
            )}

           {/* --- Cart Totals Section --- */}
           <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>SubTotal</p>
                            {/* Ensure totalAmount is a number before calling toFixed */}
                            <p>${typeof totalAmount === 'number' ? totalAmount.toFixed(2) : '0.00'}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p> {/* Or calculate dynamically if needed */}
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            {/* Assuming Total = SubTotal + Shipping (which is Free here) */}
                            <h3>${typeof totalAmount === 'number' ? totalAmount.toFixed(2) : '0.00'}</h3>
                        </div>
                    </div>
                    {/* Disable button if cart is empty */}
                    <button disabled={itemsInCart.length === 0}>PROCEED TO CHECKOUT</button>
                </div>
                {/* --- Promo Code Section --- */}
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        {/* Add state/handlers for input if functionality is needed */}
                        <input type="text" placeholder="Promo code" />
                        <button>Submit</button>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default CartItems;
