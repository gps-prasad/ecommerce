import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authDetails } from "../../store/slices/authSlice";
import { Outlet } from "react-router-dom";
import axios from "axios";

export default function Private() {
    const auth = useSelector(authDetails)
  const [ok, setOk] = useState(false);
  const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${Base_URL}/api/v1/auth/user-auth`,{
        headers:{
           Authorization:auth.token, 
        },
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <h2>Login required</h2>;
}