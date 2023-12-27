import React, {useState} from 'react';
import './css/style.css';
import signupImage from './images/signup-image.jpg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdAccountBox } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
    const navigate = useNavigate();
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone:'',
        address:'',
        password: '',
        confirmPassword:'',        
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
           const res = await axios.post(`${Base_URL}/api/v1/auth/register`,formData)
           if (res.status === 200){
            toast.success('registered successfully...')
            navigate('/signin')
           }
        }
        catch(err){
            toast.error('Something went wrong')
        }
      };
  return (
    <div className=''>
              <section className="signup">
                <Toaster/>
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <div className="register-form" id="register-form">
                            <div className="form-group">
                                <label for="name"><i className="material-icons-name"><MdAccountBox style={{fontSize:'20px'}}/></i></label>
                                <input type="text" name="name" id="name" onChange={handleChange} placeholder="Your Name"/>
                            </div>
                            <div className="form-group">
                                <label for="email"><MdEmail style={{fontSize:'20px'}}/></label>
                                <input type="email" name="email" id="email" onChange={handleChange} placeholder="Your Email"/>
                            </div>
                            <div className="form-group">
                                <label for="phone"><FaPhoneAlt style={{fontSize:'20px'}}/></label>
                                <input type="text" name="phone" id="phone" onChange={handleChange} placeholder="Your Phone Number"/>
                            </div>
                            <div className="form-group">
                                <label for="address"><FaAddressCard style={{fontSize:'20px'}}/></label>
                                <input type="text" name="address" id="address" onChange={handleChange} placeholder="Your Address"/>
                            </div>
                            <div className="form-group">
                                <label for="password"><RiLockPasswordFill style={{fontSize:'20px'}}/></label>
                                <input type="password" name="password" id="password" onChange={handleChange} placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <label for="confirmpassword"><RiLockPasswordFill style={{fontSize:'20px'}}/></label>
                                <input type="password" name="confirmPassword" onChange={handleChange} id="confirmPassword" placeholder="Repeat your password"/>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" onClick={handleSubmit} name="signup" id="signup" className="form-submit" value="Register"/>
                            </div>
                            <Link to="/signin" className="signup-image-link">I am already member</Link>
                        </div>
                    </div>
                    <div className="signup-image">
                        <figure><img src={signupImage} alt="sing up"/></figure>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
