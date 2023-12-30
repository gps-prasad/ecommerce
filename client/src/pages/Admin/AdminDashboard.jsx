import React, { useEffect, useState } from 'react'
import Dashboard from '../../components/dashboard/Dashboard';
import DashboardSideNav from '../../components/dashboard/DashboardSideNav';
import axios from 'axios';
import Edit from '../../components/Edit';

export default function AdminDashboard() {
  const [input,setInput] = useState('');
  const [categories,setCategories]= useState([]);
  const [editItem,setEditItem] = useState();
  const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${Base_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getAllCategory()
  });
  const deleteCategory = async(id) =>{
    try{
      const response = await axios.delete(`${Base_URL}/api/v1/category/delete-category/${id}`,{
        headers:{
          Authorization:JSON.parse(localStorage.getItem('auth')).token
        }
      });
    }
    catch(error){
      console.log(error)
    }
  }
  const addCategory = async() =>{
    try{
      const response = await axios.post(`${Base_URL}/api/v1/category/create-category`,{name:input},{
        headers:{
          Authorization:JSON.parse(localStorage.getItem('auth')).token
        }
      });
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div>
          <div>
        <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
        <div className="col-sm-12 col-lg-3 d-lg-block">
          <DashboardSideNav/>
        </div>
        <div className="col-lg-7">
  <h5 className="font-weight-bold text-dark mb-4">Manage Categories</h5>
      <form action="">
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            className="form-control"
            placeholder="Create Category..."
          />
          <div className="input-group-append">
            <button className="input-group-text bg-transparent text-primary" onClick={()=>addCategory()}>
             ADD 
            </button>
          </div>
        </div>
      </form>
      <table className="table mt-3">
  <thead className="table-light">
  <tr>
      <th scope="col">S No</th>
      <th scope="col">Category</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories && categories.map((item,index)=>{
      return (
        <tr>
        <th scope="row">{index+1}</th>
        <td>{item.name}</td>
        <td><span
  type="button"
  className="btn btn-outline-primary rounded-2"
  data-toggle="modal"
  data-target="#exampleModalCenter"
  onClick={()=>setEditItem(item)}
>
  Edit
</span><span className='btn btn-primary rounded-2 ml-2' onClick={()=>deleteCategory(item._id)}>Delete</span></td>
      </tr>
      )
    })}
  </tbody>
</table>
          </div>
        </div>
      </div>
    </div>
    <Edit editItem={editItem}/>
    </div>
  )
}
