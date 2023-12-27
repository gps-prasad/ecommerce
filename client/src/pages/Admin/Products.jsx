import React,{useEffect,useState} from 'react'
import DashboardSideNav from '../../components/dashboard/DashboardSideNav';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AdminDashboardSideNav from '../../components/AdminDashboardSideNav';
import { Toaster, toast } from 'react-hot-toast';

export default function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const {user} = JSON.parse(localStorage.getItem('auth'))
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

    const getAllProducts = async () => {
        try {
          const { data } = await axios.get(`${Base_URL}/api/v1/product/get-product`);
          setProducts(data.products);
          console.log(data.products)
        } catch (error) {
          console.log(error);
        //   toast.error("Someething Went Wrong");
        }
      };
    
      //lifecycle method
      useEffect(() => {
        getAllProducts();
      }, []);

      const handleDelete = async (pId) => {
        try {
          const { data } = await axios.delete(
            `${Base_URL}/api/v1/product/delete-product/${pId}`,
          );
          if (data.success) {
            toast.success(`Product is deleted`);
            getAllProducts();
    
          } else {
            // toast.error(data.message);
          }
        } catch (error) {
          // toast.error("Somtihing went wrong");
        }
      };

  return (
    <div>
        <div>
          <div>
            <Toaster/>
        <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
        <div className="col-sm-12 col-lg-3 d-lg-block">
        {user.role===1?<AdminDashboardSideNav/>:<DashboardSideNav/>}
          </div>
        <div className="col-sm-12 col-lg-9">
        <div className="container-fluid pt-5">
  <div className="row px-xl-5 pb-3">
    {products.map((product,index)=>{
        return(
            <div key={index} className="col-lg-4 col-md-8 col-sm-12 pb-1">
            <div className="card product-item border-0 mb-4">
              <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <img className="img-fluid w-100" src={`${Base_URL}/api/v1/product/product-photo/${product._id}`} alt="" />
              </div>
              <div className="card-body border text-center p-0 pt-4 pb-3">
                <h6 className="text-truncate mb-3">{product.name}</h6>
                <div className="d-flex justify-content-center">
                  <h6>${product.price}</h6>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between bg-light border">
              <button onClick={()=>navigate(`/dashboard/admin/products/${product.slug}`)} className="btn btn-sm text-dark p-0">
                <i className="fas fa-pen-to-square text-primary mr-1" />
                Edit
              </button>
              <button onClick={()=>handleDelete(product._id)} className="btn btn-sm text-dark p-0">
                <i className="fas fa-trash text-primary mr-1" />
                Delete
              </button>
            </div>
            </div>
          </div>
    )})}
  </div>
</div>
        </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
