import React, {useState} from 'react';
import signinImage from './images/signin-image.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { MdAccountBox } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authDetails } from '../../store/slices/authSlice';
import { setAuth } from '../../store/slices/authSlice';
import toast, { Toaster } from 'react-hot-toast';


export default function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(authDetails);
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
    const [formData, setFormData] = useState({
        email: '',
        password: '',    
      });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    };
    const handleSubmit = async (e) => {
        try{
            const res = await axios.post(`${Base_URL}/api/v1/auth/login`,formData)
            console.log(res)
            if (res.status === 200){
                dispatch(setAuth([res.data.user,res.data.token]))
                localStorage.setItem('auth',JSON.stringify(res.data))
                toast.success('login successfully...')
                navigate('/')
            }
         }
         catch(err){
            toast.error('Incorrect credentials')
         }
       };
  return (
    <div className='mt-2'>
              <section className="sign-in">
                <Toaster/>
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={signinImage} alt="sing up"/></figure>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign in</h2>
                        <div className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="your_name"><i className="material-icons-name"><MdAccountBox style={{fontSize:'20px'}}/></i></label>
                                <input type="text" name="email" id="your_name"  onChange={handleChange} placeholder="Your Email"/>
                            </div>
                            <div className="form-group">
                                <label for="password"><RiLockPasswordFill style={{fontSize:'20px'}}/></label>
                                <input type="password" name="password" id="password"  onChange={handleChange} placeholder="Password"/>
                            </div>
                            <div className="form-group form-button">
                                <input type='submit' name="signin" onClick={handleSubmit} id="signin" className="form-submit" value="Log in"/>
                                <Link className='btn btn-outline-primary ml-2 rounded-2'>Forgot password?</Link>
                            </div>
                        </div>
                        <div className="social-login">
                            <span className="social-label"><Link to="/signup" className="signup-image-link">Create an account</Link>Or login with</span>
                            <ul className="socials">
                                <li><a href="/"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="/"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="/"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
