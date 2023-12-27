import { createSlice } from '@reduxjs/toolkit'


const initialState = []

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addCart: (state,action)=>{
            const {product,quantity} = action.payload;
            const existingItemsString = localStorage.getItem('items');
            const existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];
            const newItem = { cartProduct:product,quantity:1 };
            const updatedItems = [...existingItems, newItem];
            localStorage.setItem('items', JSON.stringify(updatedItems));
            state=[...updatedItems]
        },
        removeCart: (state,action)=>{
            const newState=state.filter(({product})=>product._id!==action.payload)
            state = [...newState]
        }
    }
})

export const {addCart,removeCart} = cartSlice.actions;
export const cartDetails = (state)=>state.cart

export default cartSlice.reducer