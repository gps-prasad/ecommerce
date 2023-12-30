import React,{useEffect,useState} from 'react';
import './Dashboard.css';
import DashboardSideNav from '../../components/dashboard/DashboardSideNav';
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authDetails } from '../../store/slices/authSlice';
import AdminDashboardSideNav from '../../components/AdminDashboardSideNav';

export default function CreateProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("0");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("0");
    const [photo, setPhoto] = useState("");
    const auth = useSelector(authDetails)
    const {user} = JSON.parse(localStorage.getItem('auth'))

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get("http://localhost:3001/api/v1/category/get-category");
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

    const handleCreate = async () => {
    try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("category", category);
        const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
        const { data } = await axios.post(
        `${Base_URL}/api/v1/product/create-product`,
        productData,{
            headers:{
              Authorization:auth.token, 
            }
          }
        );
        console.log(data)
        if (data?.success) {
          toast.success("Product Created Successfully");
          setName('')
          setDescription('')
          setPrice('')
          setQuantity('')
          setCategory('0')
          setShipping('0')
          setPhoto('')
        } else {
        toast.error("Somtihing went wrong");
        }
    } catch (error) {
        console.log(error);
         toast.error("something went wrong");
    }
    };

  return (
    <div>
      <Toaster/>
        <div>
          <div>
        <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
        <div className="col-lg-3 col-12">
        {user.role===1?<AdminDashboardSideNav/>:<DashboardSideNav/>}
        </div>
        <div className="col-lg-7">
        <h5 className="font-weight-bold text-dark mb-4">Create Products</h5>
        <div>
        <Form.Select className='category-select-form mb-4' value={category} onChange={(e) => {setCategory(e.target.value);}} style={{border:"1px solid #D19C97"}} aria-label="Default select example">
            <option value='0'>Select Product Category...</option>
            {categories?.map((c) =>{ return (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                )})}
        </Form.Select></div>
        <div className="mb-3 mt-5">
            <label className="btn btn-outline-primary border-1 rounded-2 col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
                />
            </label>
        </div>
        <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
        <div className="mb-3">
        <input
            type="text"
            className="form-control border-1 rounded-2"
            placeholder="write a name..."
            style={{border:"1px solid #D19C97"}}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  style={{border:"1px solid #D19C97"}}
                  className="form-control border-1 rounded-2"
                  onChange={(e) => setDescription(e.target.value)}
                />
        </div>
        <div className="row mb-3">
            <div className="col-6">
                    <input
                    type="number"
                    value={price}
                    placeholder="Set Price"
                    className="form-control border-1 rounded-2"
                    style={{border:"1px solid #D19C97"}}
                    onChange={(e) => setPrice(e.target.value)}
                    />
            </div>
            <div className="col-6">
            <input
                type="number"
                value={quantity}
                placeholder="Set quantity"
                className="form-control border-1 rounded-2"
                style={{border:"1px solid #D19C97"}}
                onChange={(e) => setQuantity(e.target.value)}
            />
        </div>
        </div>
        <div>
        <Form.Select className='category-select-form mb-4' value={shipping} onChange={(e)=>{setShipping(e.target.value)}} style={{border:"1px solid #D19C97"}} aria-label="Default select example">
            <option value='0'>Shipping...</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
        </Form.Select></div>
        <div className="mb-3">
            <button className="btn btn-primary border-0 rounded-2" onClick={handleCreate}>
                CREATE PRODUCT
            </button>
        </div>
        </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
