import React,{useState,useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { authDetails } from '../../store/slices/authSlice';
import DashboardSideNav from '../../components/dashboard/DashboardSideNav';
import Form from 'react-bootstrap/Form';
import AdminDashboardSideNav from '../../components/AdminDashboardSideNav';

export default function UpdateProducts() {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("0");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("0");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    const auth = useSelector(authDetails)
    const {user} = JSON.parse(localStorage.getItem('auth'))
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

    const getSingleProduct = async () => {
        try {
          const { data } = await axios.get(
            `${Base_URL}/api/v1/product/get-product/${params.slug}`
          );
          setName(data.product.name);
          setId(data.product._id);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setQuantity(data.product.quantity);
          setShipping(data.product.shipping);
          setCategory(data.product.category._id);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
      }, []);
      //get all category
      const getAllCategory = async () => {
        try {
          const { data } = await axios.get(`${Base_URL}/api/v1/category/get-category`);
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something wwent wrong in getting catgeory");
        }
      };
    
      useEffect(() => {
        getAllCategory();
      }, []);
    
      //create product function
      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("quantity", quantity);
          photo && productData.append("photo", photo);
          productData.append("category", category);
          const { data } = axios.put(
            `${Base_URL}/api/v1/product/update-product/${id}`,
            productData,{
                headers:{
                  Authorization:auth.token, 
                }
              }
          );
          if (data?.success) {
            toast.error(data?.message);
          } else {
            toast.success("Product Updated Successfully");
            navigate("/dashboard/admin/products");
          }
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      };
    
      //delete a product
      const handleDelete = async () => {
        try {
          let answer = window.prompt("Are You Sure want to delete this product ? ");
          if (!answer) return;
          const { data } = await axios.delete(
            `${Base_URL}/api/v1/product/delete-product/${id}`,{
                headers:{
                  Authorization:auth.token, 
                }
              }
          );
          toast.success("Product Deleted Succfully");
          navigate("/dashboard/admin/products");
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

  return (
    <div>
        <div>
          <div>
        <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
        {user.role===1?<AdminDashboardSideNav/>:<DashboardSideNav/>}
          </div>
        <div className="col-lg-7">
        <h5 className="font-weight-bold text-dark mb-4">Update Product</h5>
        <div>
        <Form.Select className='category-select-form mb-4' value={category} onChange={(e) => {setCategory(e.target.value);}} style={{border:"1px solid #D19C97"}} aria-label="Default select example">
            <option value='0'>Select Product Category...</option>
            {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
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
        {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${Base_URL}/api/v1/product/product-photo/${id}`}
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
        <Form.Select className='category-select-form mb-4' value={shipping ? "1" : "2"} onChange={(e)=>{setShipping(e.target.value)}} style={{border:"1px solid #D19C97"}} aria-label="Default select example">
            <option value='0'>Shipping...</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
        </Form.Select></div>
        <div className="mb-3">
            <button className="btn btn-primary border-0 rounded-2" onClick={handleUpdate}>
                UPDATE PRODUCT
            </button>
        </div>
        <div className="mb-3">
            <button className="btn btn-outline-primary border-1 rounded-2" onClick={handleDelete}>
                DELETE PRODUCT
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
