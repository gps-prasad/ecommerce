import React, {useState} from 'react';
import signinImage from './images/signin-image.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { MdAccountBox } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authDetails } from '../../store/slices/authSlice';
import { setAuth } from '../../store/slices/authSlice';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(authDetails);
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
    const [formData, setFormData] = useState({
        email: '',
        name: '',    
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
            const res = await axios.post(`${Base_URL}/api/v1/mail/forgot-password`,formData)
            console.log(res)
            if (res.status === 200){
                window.alert('OTP send to your registered mail ID')
            }
            else{
                console.log(res.message)
            }
         }
         catch(err){
             console.log(err)
         }
       };
  return (
    <div className='mt-2'>
              <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={signinImage} alt="sing up"/></figure>
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title">Forgot password</h2>
                        <div className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="your_name"><i className="material-icons-name"><MdAccountBox style={{fontSize:'20px'}}/></i></label>
                                <input type="text" name="name" id="your_name"  onChange={handleChange} placeholder="Your Name"/>
                            </div>
                            <div className="form-group">
                                <label for="email"><MdEmail style={{fontSize:'20px'}}/></label>
                                <input type="email" name="email" id="email" onChange={handleChange} placeholder="Your Email"/>
                            </div>
                            <div className="form-group form-button">
                                <input type='submit' name="signin" onClick={handleSubmit} id="signin" className="form-submit" value="Send OTP"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
