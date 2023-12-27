import React, { useEffect, useState } from 'react'
import Footer from '../components/footer/Footer';
import { cartDetails } from '../store/slices/cartSlice';
import { useDispatch,useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate();
    const [cart,setCart] = useState([]);
    const [total,setTotal] =useState(0);
    const [subTotal,setSubTotal] =useState(0);

    useEffect(()=>{
        const existingItemsString = localStorage.getItem('items');
        const cart = existingItemsString ? JSON.parse(existingItemsString) : [];
        setCart(cart)
    },[])

    useEffect(()=>{
        cartTotal()
    },[cart])

    const cartTotal = () =>{
        const existingItemsString = localStorage.getItem('items');
        const cartItems = existingItemsString ? JSON.parse(existingItemsString) : [];
        var q = 0;
        var t = 0;
        cartItems.map(({cartProduct,quantity},index)=>{
            q = q + quantity
            t = t + (cartProduct.price)*(quantity)
        })
        setSubTotal(t)
        setTotal(t+q)
    }
    
    const removeCart=(id)=>{
        const existingItemsString = localStorage.getItem('items');
        const existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];
        const updatedItems = existingItems.filter(({cartProduct})=>cartProduct._id!==id)
        localStorage.setItem('items', JSON.stringify(updatedItems));
        setCart(updatedItems)
    }

  return (
    <div>
<div className="container-fluid pt-5">
  <div className="row px-xl-5">
    <div className="col-lg-8 table-responsive mb-5">
      {cart.length!==0?
      (<table className="table table-bordered text-center mb-0">
        <thead className="bg-secondary text-dark">
          <tr>
            <th>Products</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="align-middle">
            {cart.map(({cartProduct,quantity},index)=>{
                return( <CartItem product={cartProduct} quantity={quantity} removeCart={removeCart} setCart={setCart}/>)
            })}

        </tbody>
      </table>):<h2>No Items in Cart</h2>}
    </div>
    <div className="col-lg-4">
      <form className="mb-5" action="">
        <div className="input-group">
          <input
            type="text"
            className="form-control p-4"
            placeholder="Coupon Code"
          />
          <div className="input-group-append">
            <button className="btn btn-primary">Apply Coupon</button>
          </div>
        </div>
      </form>
      <div className="card border-secondary mb-5">
        <div className="card-header bg-secondary border-0">
          <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3 pt-1">
            <h6 className="font-weight-medium">Subtotal</h6>
            <h6 className="font-weight-medium">${subTotal}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="font-weight-medium">Shipping</h6>
            <h6 className="font-weight-medium">${total-subTotal}</h6>
          </div>
        </div>
        <div className="card-footer border-secondary bg-transparent">
          <div className="d-flex justify-content-between mt-2">
            <h5 className="font-weight-bold">Total</h5>
            <h5 className="font-weight-bold">${total}</h5>
          </div>
          <button className="btn btn-block btn-primary my-3 py-3" disabled={total>0?false:true} onClick={()=>navigate('/checkout')}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
<Footer/>
    </div>
  )
}
