import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authDetails } from "../../store/slices/authSlice";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

export default function Private() {
  const auth = JSON.parse(localStorage.getItem('auth'))
  const [isLoading,setIsLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

  useEffect(() => {
    const authCheck = async () => {
      setIsLoading(true)
      const res = await axios.get(`${Base_URL}/api/v1/auth/user-auth`,{
        headers:{
           Authorization:auth.token, 
        },
      });
      setIsLoading(false)
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : (isLoading===true?(<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span></div>):(<><h1>Login Required</h1><Link to='/signin' className="btn btn-primary mt-2 rounded-2">Login</Link></>));
}