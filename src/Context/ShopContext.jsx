import React, { createContext, useState, useEffect } from 'react';
import all_product from '../Components/assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    if (all_product && all_product.length > 0) {
        for (let index = 0; index < all_product.length; index++) {
            if (all_product[index] && all_product[index].id !== undefined) {
                 cart[all_product[index].id] = 0;
            } else {
                console.warn(`Product at index ${index} is invalid or missing an ID.`);
            }
        }
    } else {
        console.warn("all_product data is not available or empty during cart initialization.");
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            if (localData && localData.startsWith('{') && localData.endsWith('}')) {
                 const parsedData = JSON.parse(localData);
                 return parsedData;
            }
            return getDefaultCart();
        } catch (error) {
            console.error("Could not parse cart items from localStorage, using default.", error);
            return getDefaultCart();
        }
    });

    // Persist cartItems to localStorage whenever it changes
    useEffect(() => {
        // Only attempt to save if cartItems is a valid object
        if (cartItems && typeof cartItems === 'object') {
            try {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            } catch (error) {
                console.error("Could not save cart items to localStorage", error);
            }
        }
    }, [cartItems]); 


    const addToCart = (itemId) => {
        if (itemId === undefined || itemId === null) {
            console.error("addToCart called with invalid itemId:", itemId);
            return;
        }
        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            return newCart;
        });
    };

    const removeFromCart = (itemId) => {
        if (itemId === undefined || itemId === null) {
            console.error("removeFromCart called with invalid itemId:", itemId);
            return;
        }
        setCartItems((prev) => {
            const newQuantity = Math.max(0, (prev[itemId] || 0) - 1);
            const newCart = { ...prev, [itemId]: newQuantity };
            return newCart;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if (!all_product || !cartItems) return 0;

        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = all_product.find((product) => product && product.id === Number(itemId));

                if (itemInfo && typeof itemInfo.new_price === 'number') {
                    totalAmount += itemInfo.new_price * cartItems[itemId];
                } else if (itemInfo) {
                     console.warn(`Product with ID ${itemId} has invalid price: ${itemInfo.new_price}`);
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        if (!cartItems) return 0; 

        for (const itemId in cartItems) {
            if (typeof cartItems[itemId] === 'number' && cartItems[itemId] > 0) {
                totalItems += cartItems[itemId];
            }
        }
        return totalItems;
    }

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
