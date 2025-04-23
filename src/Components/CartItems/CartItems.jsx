// import React, { useContext } from 'react'
// import './cartItems.css'
// import { ShopContext } from '../../Context/shopContext'
// import remove_icon from '../assets/cart_cross_icon.png';

// const CartItems = () => {
//     const {all_product,cartItems,removeFromCart} = useContext(ShopContext);
//   return (  <div>    
//          <div className='cartitems'>
//         <div className="cartitems-format-main">
//             <p>Products</p>
//             <p>Title</p>
//             <p>Price</p>
//             <p>Quantity</p>
//             <p>Total</p>
//             <p>Remove</p>
//         </div>
//         <hr />
//        {all_product.map((e)=>{
//         if(cartItems[e.id>0]){
//             return(
//                  <div>
//             <div className='cartItemsFormat'>
//                 <img src="" alt="" className='carticon-product-icon' />
//                 <p></p>
//                 <p></p>
//                 <button className='cartitems-quantity'></button>
//                 <p></p>
//                 <img src={remove_icon} onClick = {()=>{removeFromCart()}} alt="" />
//             </div>
//         </div>
//             )
//         }
//        })}
//   )


// export default CartItems;

// import React, { useContext } from 'react';
// import './cartItems.css';
// import { ShopContext } from '../../Context/shopContext';
// import remove_icon from '../assets/cart_cross_icon.png';

// const CartItems = () => {
//     const { getTotalCartAmount,all_product, cartItems, removeFromCart } = useContext(ShopContext);

//     return ( // Added parentheses for better readability with multi-line JSX
//         <div className='cartitems'>
//             <div className="cartitems-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             {all_product.map((e) => {
//                 if (cartItems[e.id] > 0) {
//                     return (
//                         <div key={e.id}> 
//                             <div className='cartitems-format cartitems-format-main'>
//                                 <img src={e.image} alt="" className='carticon-product-icon' />
//                                 <p>{e.name}</p> 
//                                 <p>${e.new_price}</p> 
//                                 <button className='cartitems-quantity'>{cartItems[e.id]}</button> 
//                                 <p>${e.new_price * cartItems[e.id]}</p> 
//                                 <img
//                                     className='cartitems-remove-icon' 
//                                     src={remove_icon}
//                                     onClick={() => { removeFromCart(e.id) }} 
//                                     alt="Remove Item"
//                                 />
//                             </div>
//                             <hr /> 
//                         </div>
//                     );
//                 }
//                 return null; 
//             })}
//            <div className="cartitems-down">
//             <div className="cartitems-total">
//                 <h1>Cart Totals</h1>
//                 <div>
//                     <div className="cartitems-total-item">
//                         <p>SubTotal</p>
//                         <p>${getTotalCartAmount()}</p>
//                     </div>
//                     <hr />
//                     <div className="cartitems-total-item">
//                         <p>Shipping</p>
//                         <p>Free</p>
//                     </div>
//                      <hr />
//                      <div className="cartitems-total-item">
//                         <h3>Total</h3>
//                         <h3>${getTotalCartAmount()}</h3>

//                      </div>
//                 </div>
//                 <button>PROCEED TO CHECKOUT</button>
//             </div>
//             <div className="cartitems-promocode">
//                 <p>If you have a promo code,Enter it here</p>
//                 <div className="cartitems-promobox">
//                     <input type="text" placeholder = "Promo code" />
//                     <button>Submit</button>
//                 </div>
//             </div>
//            </div>
//         </div> 
//     ); 
// }; 

// export default CartItems;


import React, { useContext } from 'react';
import './cartItems.css';
import { ShopContext } from '../../Context/shopContext';
import remove_icon from '../assets/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    // Calculate the total amount once to avoid calling the function multiple times
    const totalAmount = getTotalCartAmount();

    return (
        <div className='cartitems'>
            {/* ... (Item mapping section remains the same) ... */}
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className='cartitems-format cartitems-format-main'>
                                <img src={e.image} alt={e.name} className='carticon-product-icon' /> {/* Added alt text */}
                                <p>{e.name}</p>
                                <p>${e.new_price.toFixed(2)}</p> {/* Format price */}
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p> {/* Format total */}
                                <img
                                    className='cartitems-remove-icon'
                                    src={remove_icon}
                                    onClick={() => { removeFromCart(e.id) }}
                                    alt="Remove Item"
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
           {/* --- Cart Totals Section --- */}
           <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    {/* Use the calculated totalAmount for SubTotal */}
                    <div className="cartitems-total-item">
                        <p>SubTotal</p>
                        <p>${totalAmount.toFixed(2)}</p> {/* <-- Use calculated amount and format */}
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p> {/* Changed label for clarity */}
                        <p>Free</p> {/* Assuming shipping is always free for now */}
                    </div>
                     <hr />
                     {/* Use the calculated totalAmount for the final Total */}
                     <div className="cartitems-total-item">
                        <h3>Total</h3>
                        {/* Assuming SubTotal and Total are the same if shipping is free */}
                        <h3>${totalAmount.toFixed(2)}</h3> {/* <-- Use calculated amount and format */}
                     </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            {/* --- Promo Code Section --- */}
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder = "Promo code" />
                    <button>Submit</button>
                </div>
            </div>
           </div>
        </div>
    );
};

export default CartItems;

