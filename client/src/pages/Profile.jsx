import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardSideNav from '../components/dashboard/DashboardSideNav';
import AdminDashboardSideNav from '../components/AdminDashboardSideNav';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [edit,setEdit] = useState(false);
  const {user} = JSON.parse(localStorage.getItem('auth'))
  const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

  const handleCreate = async() => {
    try{
      const res = await axios.post(`${Base_URL}/api/v1/auth/user-details-update`,{name,phone,address},{
        headers:{
          Authorization:JSON.parse(localStorage.getItem('auth')).token
        }
      })
      if (res.status === 200){
        setEdit(false)
        toast.success('User details updated successfully...');
      }
   }
   catch(err){
       console.log(err)
   }
  }
  useEffect(()=>{
    setName(user.name)
    setPhone(user.phone)
    setEmail(user.email)
    setAddress(user.address)
  },[])
  return (
    <div>
      <Toaster />
      <div className="container-fluid mb-5">
      <div className="row border-top px-xl-5">
      <div className="col-lg-3 d-none d-lg-block">
        {user.role===1?<AdminDashboardSideNav/>:<DashboardSideNav/>}
      </div>
      <div className="col-lg-7">
        <h5 className="font-weight-bold text-dark mb-4">User Profile</h5>
        <div className="mb-3">
        <input
            type="text"
            disabled={!edit}
            className="form-control border-1 rounded-2"
            placeholder="your name..."
            style={{border:"1px solid #D19C97"}}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="row mb-3">
        <div className="col-6">
              <input
                type="text"
                value={email}
                disabled={!edit}
                placeholder="Email...."
                style={{border:"1px solid #D19C97"}}
                className="form-control border-1 rounded-2"
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className="col-6">
          <input
                type="number"
                value={phone}
                disabled={!edit}
                placeholder="Phone Number"
                className="form-control border-1 rounded-left"
                style={{border:"1px solid #D19C97"}}
                onChange={(e) => setPhone(e.target.value)}
                />
          </div>
        </div>
        <div className="row mb-3">
            <div className="col-12">
            <textarea
                type="date"
                value={address}
                disabled={!edit}
                placeholder="Address..."
                className="form-control border-1 rounded-2"
                style={{border:"1px solid #D19C97"}}
                onChange={(e) => setAddress(e.target.value)}
            />
        </div>
        </div>
        <div>
        <div className="mb-3">
        <button className="btn btn-outline-primary rounded-2 mr-2" onClick={()=>setEdit(!edit)}>
                Toggle Edit
            </button>
            <button className="btn btn-primary border-0 rounded-2" onClick={handleCreate}>
                Update Profile
            </button>
        </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
