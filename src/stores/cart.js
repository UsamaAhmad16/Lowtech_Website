// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//     items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
//     statusTab: false
// }
// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addToCart(state, action){
//             const {productId, quantity} = action.payload;
//             const indexProductId = (state.items).findIndex(item => item.productId === productId);
//             if(indexProductId >= 0){
//                 state.items[indexProductId].quantity += quantity;
//             }else{
//                 state.items.push({productId, quantity});
//             }
//             localStorage.setItem("carts", JSON.stringify(state.items));
//         },
//         changeQuantity(state, action){
//             const {productId, quantity} = action.payload;
//             const indexProductId = (state.items).findIndex(item => item.productId === productId);
//             if(quantity > 0){
//                 state.items[indexProductId].quantity = quantity;
//             }else{
//                 state.items = (state.items).filter(item => item.productId !== productId);
//             }
//             localStorage.setItem("carts", JSON.stringify(state.items));
//         },
//         toggleStatusTab(state){
//             if(state.statusTab === false){
//                 state.statusTab = true;
//             }else{
//                 state.statusTab = false;
//             }
//         }
//     }
// })
// export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
    statusTab: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add an item to the cart
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            if (indexProductId >= 0) {
                state.items[indexProductId].quantity += quantity; // Update quantity if item exists
            } else {
                state.items.push({ productId, quantity }); // Add new item to the cart
            }
            localStorage.setItem("carts", JSON.stringify(state.items)); // Update localStorage
        },

        // Change the quantity of an item in the cart
        changeQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            if (quantity > 0) {
                state.items[indexProductId].quantity = quantity; // Update quantity
            } else {
                state.items = state.items.filter(item => item.productId !== productId); // Remove item if quantity is 0
            }
            localStorage.setItem("carts", JSON.stringify(state.items)); // Update localStorage
        },

        // Toggle the visibility of the cart tab
        toggleStatusTab(state) {
            state.statusTab = !state.statusTab; // Toggle statusTab
        },

        // Clear the cart (new action)
        clearCart(state) {
            state.items = []; // Clear the cart items
            localStorage.removeItem("carts"); // Remove carts from localStorage
        },
    },
});

// Export the actions
export const { addToCart, changeQuantity, toggleStatusTab, clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;