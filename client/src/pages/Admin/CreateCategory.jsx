import React from 'react';
import DashboardSideNav from '../../components/dashboard/DashboardSideNav';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast,Toaster} from 'react-hot-toast';
import { authDetails } from '../../store/slices/authSlice';
import AdminDashboardSideNav from '../../components/AdminDashboardSideNav';

export default function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const auth = useSelector(authDetails);
    const {user} = JSON.parse(localStorage.getItem('auth'));
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

    const handleSubmit = async (e) => {
      try {
        const { data } = await axios.post(`${Base_URL}/api/v1/category/create-category`, {
          name},{
            headers:{
              Authorization:auth.token, 
            }
          });
        if (data?.success) {
           toast.success(`${name} category is created`);
          getAllCategory();
          setName('')
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
         toast.error("somthing went wrong in input form");
      }
    };

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get(`${Base_URL}/api/v1/category/get-category`);
          if (data?.success) {
            setCategories(data.category);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong in getting catgeory");
        }
      };
    
      useEffect(() => {
        getAllCategory();
      }, []);

    const handleUpdate = async (e) => {
        try {
          const { data } = await axios.put(
            `${Base_URL}/api/v1/category/update-category/${selected._id}`,
            { name: updatedName },{
              headers:{
                 Authorization:auth.token, 
              },}
          );
          if (data?.success) {
            toast.success(`${updatedName} category is updated`);
            setSelected(null);
            setUpdatedName("");
            setVisible(false);
            getAllCategory();
          } else {
            toast.error(data?.message);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleDelete = async (pId) => {
        try {
          const { data } = await axios.delete(
            `${Base_URL}/api/v1/category/delete-category/${pId}`,{
              headers:{
                 Authorization:auth.token, 
              },}
          );
          if (data.success) {
            toast.success(`category is deleted`);
    
            getAllCategory();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Somtihing went wrong");
        }
      };

  return (
    <div>
          <div>
            <Toaster/>
          <div>
        <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
        {user.role===1?<AdminDashboardSideNav/>:<DashboardSideNav/>}
          </div>
        <div className="col-lg-7">
  <h5 className="font-weight-bold text-dark mb-4">Manage Categories</h5>
      <form action="">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Create Category..."
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <div className="input-group-append">
            <span className="btn input-group-text bg-transparent text-primary" onClick={handleSubmit}>
             ADD 
            </span>
          </div>
        </div>
      </form>
      <table className="table mt-3">
  <thead className="table-light">
  <tr>
      <th scope="col">Category</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((item,index)=>{
      return(
      <tr>
      <td>{item.name}</td>
      <td><button
        className="btn text-primary ms-2"
        onClick={() => {
            setVisible(true);
            setUpdatedName(item.name);
            setSelected(item);
        }}
        >
        Edit
        </button>
        <button
        className="btn btn-primary text-white rounded-1 ms-2 border-0"
        onClick={() => {
            handleDelete(item._id);
        }}
        >
        Delete
        </button></td>
    </tr>)
    })}
  </tbody>
</table>
          </div>
          <Modal
      show={visible}
      onHide={()=>{setVisible(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <input
            type="text"
            className="form-control"
            placeholder="Update Category..."
            value={updatedName}
            onChange={(e)=>setUpdatedName(e.target.value)}
          />
      </Modal.Body>
      <Modal.Footer>
        <span className='btn text-primary' onClick={()=>{setVisible(false)}}>Close</span>
        <Button className='btn btn-primary text-white rounded-1' onClick={handleUpdate}>Submit</Button>
      </Modal.Footer>
    </Modal>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
