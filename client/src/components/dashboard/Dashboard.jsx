import React, { useEffect, useState } from 'react'
import '../css/style.css';
import DashboardSideNav from './DashboardSideNav';
import axios from 'axios';
import AdminDashboardSideNav from '../AdminDashboardSideNav';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [orders,setOrders] = useState([])
  const {user} = JSON.parse(localStorage.getItem('auth'))
  const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
  const getOrders = async() => {
    const data = await axios.post(`${Base_URL}/api/v1/orders/getorders`,{user})
    setOrders(data.data.orders)
  }
  useEffect(()=>{
    getOrders()
  },[])
  return (
    <div>
    <div>
      <div className="container-fluid mb-5">
      <div className="row border-top px-xl-5">
      <div className="col-lg-3 d-none d-lg-block">
      {user.role===1?<AdminDashboardSideNav/>:<DashboardSideNav/>}
        </div>
      <div className="col-lg-7">
    <h5 className="font-weight-bold text-dark mb-4">Orders</h5>
    <table className="table mt-3">
    <thead className="table-light">
    <tr>
    <th scope="col">S No</th>
    <th scope="col">Order_id</th>
    <th scope="col">Order_Date</th>
    </tr>
    </thead>
    <tbody>
    {orders.map((item,index)=>
    {return (<tr>
        <th scope="row">{index+1}</th>
        <th><Link to={`/dashboard/${user.role===1?'admin':'user'}/invoice/${item._id}`}>{item._id}</Link></th>
        <td>{item.createdAt}</td>
        </tr>)}
    )}
    </tbody>
    </table>

        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
