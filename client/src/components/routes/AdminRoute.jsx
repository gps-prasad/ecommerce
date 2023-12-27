import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authDetails } from "../../store/slices/authSlice";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

export default function AdminRoute() {
    const auth = useSelector(authDetails)
  const [ok, setOk] = useState(false);
  const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${Base_URL}/api/v1/auth/admin-auth`,{
        headers:{
           Authorization:auth.token, 
        },
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
      console.log(ok)
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : (<><h1>Login Required</h1>
  <Link to='/signin' className="btn btn-primary mt-2 rounded-2">Login</Link>
  </>);
}
