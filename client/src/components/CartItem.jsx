import React from 'react';
import { useState } from 'react';
import { removeCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';

export default function CartItem({product,quantity,removeCart,setCart}) {
    const [quan,setQuan] =useState(quantity);
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
    const updateCartItem=(id,load)=>{
        const existingItemsString = localStorage.getItem('items');
        const cart = existingItemsString ? JSON.parse(existingItemsString) : [];
        const newCart = cart.map(({cartProduct,quantity},index)=>{
            if (cartProduct._id===id){
                quantity = quantity + load
                setQuan(quantity)
                return {cartProduct,quantity}
            }
            else{
                return {cartProduct,quantity}
            }
        })
        setCart(newCart)
        localStorage.setItem('items', JSON.stringify(newCart));
    }
  return (
      <tr>
        <td className="align-middle">
            <img src={`${Base_URL}/api/v1/product/product-photo/${product._id}`} alt="" style={{ width: 70 }} />
            {product.name}
        </td>
        <td className="align-middle">${product.price}</td>
        <td className="align-middle">
            <div
            className="input-group quantity mx-auto"
            style={{ width: 100 }}
            >
            <div className="input-group-btn">
                <button onClick={()=>{updateCartItem(product._id,-1)}} disabled={quan<=1?true:false} className="btn btn-sm btn-primary btn-minus">
                <i className="fa fa-minus" />
                </button>
            </div>
            <input
                type="text"
                className="form-control form-control-sm bg-secondary text-center"
                value={quan}
            />
            <div className="input-group-btn">
                <button onClick={()=>{setQuan(quan+1); updateCartItem(product._id,1)}}  className="btn btn-sm btn-primary btn-plus">
                <i className="fa fa-plus" />
                </button>
            </div>
            </div>
        </td>
        <td className="align-middle">${quan*product.price}</td>
        <td className="align-middle">
            <button className="btn btn-sm btn-primary" onClick={()=>removeCart(product._id)}>
            <i className="fa fa-times" />
            </button>
        </td>
        </tr>
  )
}
