import React, { createContext, useState, useEffect } from 'react';
import all_product from '../Components/assets/all_product'; // Assuming this path is correct

// 1. Create the Context
export const ShopContext = createContext(null);

// Helper function to initialize the cart state
const getDefaultCart = () => {
    let cart = {};
    // Initialize cart with 0 quantity for each product ID
    for (let index = 0; index < all_product.length; index++) {
        cart[all_product[index].id] = 0;
    }
    return cart;
};

// 2. Define the Provider Component
const ShopContextProvider = (props) => {

    // 3. State for cart items
    // Initialize cart from localStorage if available, otherwise use default
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : getDefaultCart();
        } catch (error) {
            console.error("Could not parse cart items from localStorage", error);
            return getDefaultCart();
        }
    });

    // Persist cartItems to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Could not save cart items to localStorage", error);
        }
    }, [cartItems]); // Dependency array ensures this runs only when cartItems changes


    // 4. Function to add an item to the cart
    const addToCart = (itemId) => {
        setCartItems((prev) => {
            // Create a new object to ensure state update triggers re-render
            const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            console.log("Added to cart:", itemId, "New Cart:", newCart); // For debugging
            return newCart;
        });
    };

    // 5. Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            // Ensure quantity doesn't go below 0
            const newQuantity = Math.max(0, (prev[itemId] || 0) - 1);
            const newCart = { ...prev, [itemId]: newQuantity };
            console.log("Removed from cart:", itemId, "New Cart:", newCart); // For debugging
            return newCart;
        });
    };

    // 6. Function to calculate the total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                // Find the product info from all_product array
                // Ensure comparison is correct (e.g., string key vs number id)
                let itemInfo = all_product.find((product) => product.id === Number(itemId));

                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[itemId];
                } else {
                    // Optional: Handle case where item in cart doesn't exist in all_product
                    console.warn(`Product with ID ${itemId} not found in all_product list.`);
                }
            }
        }
        return totalAmount;
    };

    // 7. Function to get the total number of items in the cart (for navbar icon, etc.)
    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                totalItems += cartItems[itemId];
            }
        }
        return totalItems;
    }

    // 8. Define the context value including state and functions
    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems // Added this useful function
    };

    // Log context value for debugging (optional)
    // console.log("ShopContext Value:", contextValue);
    // console.log("Current Cart State:", cartItems);

    // 9. Return the Provider wrapping children
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

// 10. Export the Provider
export default ShopContextProvider;
