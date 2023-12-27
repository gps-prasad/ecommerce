import React,{useState,useEffect} from 'react';
import ReactPayPal from '../components/Paypal';
import '../components/css/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function CheckOut() {
    const {user} = JSON.parse(localStorage.getItem('auth'))
    const [cart,setCart] = useState([]);
    const [total,setTotal] =useState(0);
    const [subTotal,setSubTotal] =useState(0);
    const [checkout, setCheckout] = useState(false);
    const navigate = useNavigate();
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

    const [address,setAddress] = useState({
        firstName:'',
        lastName:'',
        email:'',
        mobile:'',
        address1:'',
        address2:'',
        country:'USA',
        city:'',
        state:'',
        zip:''
    });

    const formHandler = (e) =>{
        setAddress({...address,[e.target.name]:e.target.value})
    }

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

    const checkoutHandler = () =>{
        const values = Object.entries(address)
        const isValid = values.every(([key,value])=>value!=='')
        if (isValid){
            setCheckout(true)
        }
        else{
            toast.error("Enter the delivery address details properly...")
        }     
    }

    const setOrderData = async(e) => {
        const user = JSON.parse(localStorage.getItem('auth')).user._id
        const role = JSON.parse(localStorage.getItem('auth')).user.role
        const products = JSON.parse(localStorage.getItem('items'))
        const payee_name = e.payer.name.given_name +' '+ e.payer.name.surname
        const payment_Id = e.id
        const orderDetails = {...address,user,payee_name,payment_Id,products,total}
        const {data} = await axios.post(`${Base_URL}/api/v1/orders/order`,orderDetails)
        console.log(data)
        if (data?.success){
            toast.success('Order placed successfully....')
            navigate(`/dashboard/${role===1?'admin':'user'}/invoice/${data.id}`)
        }
        else{
            toast.error('Something went wrong')
        }
        localStorage.removeItem('items')
    }


  return (
      <div className="container-fluid pt-5">
        <Toaster/>
        <div className="row px-xl-5">
            <div className="col-lg-8">
            <div className="mb-4">
                <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                <div className="row">
                <div className="col-md-6 form-group">
                    <label for="exampleInput"></label>
                    <input className="form-control" id="exampleInput" name='firstName' value={address.firstName} onChange={formHandler}  type="text" placeholder="First Name" />
                </div>
                <div className="col-md-6 form-group">
                    <label></label>
                    <input className="form-control" name="lastName" value={address.lastName} onChange={formHandler} type="text" placeholder="Last Name" />
                </div>
                <div className="col-md-6 form-group">
                    <label></label>
                    <input
                    className="form-control"
                    type="text"
                    name='email' value={address.email} onChange={formHandler}
                    placeholder="E-mail"
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label></label>
                    <input
                    className="form-control"
                    type="text"
                    name='mobile' value={address.mobile} onChange={formHandler}
                    placeholder="Mobile No"
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label></label>
                    <input
                    className="form-control"
                    type="text"
                    name='address1' value={address.address1} onChange={formHandler}
                    placeholder="Address Line 1"
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label></label>
                    <input
                    className="form-control"
                    type="text"
                    name='address2' value={address.address2} onChange={formHandler}
                    placeholder="Address Line 2"
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label></label>
                    <select className="custom-select" name='state' value={address.country} onChange={formHandler}>
                    <option value='usa' selected>USA</option>
                    </select>
                </div>
                <div className="col-md-6 form-group">
                    <label></label>
                    <input
                    className="form-control"
                    type="text"
                    name='city' value={address.city} onChange={formHandler}
                    placeholder="City"
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label></label>
                    <input
                    className="form-control"
                    type="text"
                    name='state' value={address.state} onChange={formHandler}
                    placeholder="State"
                    />
                </div>
                <div className="col-md-6 form-group">
                    <label></label>
                    <input className="form-control" type="text" placeholder='ZIP Code' name='zip' value={address.zip} onChange={formHandler}/>
                </div>
                </div>
            </div>
            </div>
            <div className="col-lg-4">
            <div className="card border-secondary mb-5">
                <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                </div>
                <div className="card-body">
                <h5 className="font-weight-medium mb-3">Products</h5>
                {cart.map(({cartProduct,quantity},index)=>{
                    return(                <div className="d-flex justify-content-between">
                    <p>{cartProduct.name}<span style={{fontStyle:'oblique'}}>({quantity})</span></p>
                    <p>${(cartProduct.price)*(quantity)}</p>
                </div>)
                })}
                <hr className="mt-0" />
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
                </div>
            </div>
            <div className="card border-secondary mb-5">
                <div className="card-header bg-secondary border-0 mb-3">
                <h4 className="font-weight-semi-bold m-0">Payment</h4>
                </div>
                <div className="mt-25 custom-control custom-radio h-100">
                    <input
                        type="radio"
                        checked
                        className="custom-control-input"
                        name="payment"
                        id="paypal"
                    />
                    <label className="custom-control-label" htmlFor="paypal">
                        Paypal
                    </label>
                    </div>
                <div className="card-footer border-secondary bg-transparent">
                <header>
                    {(checkout === true) 
                    ? <div className="payment-div">
                        <ReactPayPal total={total} setOrderData={setOrderData}/>
                    </div> 

                    :<div>
                        <button onClick={checkoutHandler}  className="btn btn-primary w-100 border-0 rounded-5">Checkout</button>
                    </div>
                    }
                </header>
                </div>
            </div>
            </div>
        </div>
        </div>
  )
}
