import { useEffect } from 'react';
import './App.css';
import Signin from './components/login/Signin';
import Signup from './components/login/Signup';
import Navbar from './components/navabar/Navbar';
import Test from './components/test/Test.jsx';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { authDetails, setAuth } from './store/slices/authSlice.jsx';
import Private from './components/routes/Private.jsx';
import AdminRoute from './components/routes/AdminRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import CreateCategory from './pages/Admin/CreateCategory.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';
import Products from './pages/Admin/Products.jsx';
import UpdateProducts from './pages/Admin/UpdateProducts.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import CheckOut from './pages/CheckOut.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import Invoice from './components/Invoice.jsx';
import ContactDetails from './pages/ContactDetails.jsx';
import ForgotPassword from './components/login/ForgotPassword.jsx';
import PageNotFound from './pages/PageNotFound.jsx';


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('auth'));
    if (data){
      console.log(data)
      dispatch(setAuth([data.user,data.token]))
    }
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/test/:id' element={<Invoice/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
          <Route path='/contact' element={<ContactDetails/>}/>
          <Route path='/product/:slug' element={<ProductDetails/>}/>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Private/>} >
            <Route path="user/profile" exact element={<Profile/>} />
            <Route path="user/orders" element={<Dashboard/>} />
            <Route path='user/invoice/:id' element={<Invoice/>}/>
          </Route>
          <Route path="/dashboard" element={<AdminRoute/>} >
            <Route path="admin/profile" exact element={<Profile/>} />
            <Route path="admin/orders" element={<Dashboard/>} />
            <Route path="admin/products" element={<Products/>} />
            <Route path="admin/products/:slug" element={<UpdateProducts/>} />
            <Route path="admin/create-category" element={<CreateCategory/>} />
            <Route path="admin/create-products" element={<CreateProduct/>} />
            <Route path='admin/invoice/:id' element={<Invoice/>}/>
          </Route>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
