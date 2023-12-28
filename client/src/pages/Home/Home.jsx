import React,{useState,useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { authDetails } from '../../store/slices/authSlice';
import { addCart, removeCart } from '../../store/slices/cartSlice.jsx';
import { cartDetails } from '../../store/slices/cartSlice.jsx';
import { useSelector,useDispatch } from 'react-redux';
import SearchBar from '../../components/searchBar/SearchBar.jsx'
import axios from 'axios';
import Footer from '../../components/footer/Footer.jsx';
import { Toaster } from 'react-hot-toast';


export default function Home() {  
  const auth = useSelector(authDetails)
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const cart = useSelector(cartDetails)
  const dispatch = useDispatch();
  const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

  const getAllCategory = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${Base_URL}/api/v1/category/get-category`);
      setLoading(false)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${Base_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${Base_URL}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Pagination();
  }, [page]);
  //load more
  const Pagination = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${Base_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async (checked,radio) => {
    try {
      console.log(checked,radio)
      const { data } = await axios.post(`${Base_URL}/api/v1/product/product-filters`, {
        checked,
        radio:JSON.parse(radio),
      });
      console.log(data)
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProduct = async(keyword) => {
    try{setLoading(true)
    const {data} = await axios.get(`${Base_URL}/api/v1/product/search/${keyword}`);
    setProducts(data)
    setLoading(false)
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <div>
      <Toaster/>
    <SearchBar searchProduct={searchProduct} filterProduct={filterProduct} categories={categories}/>
      <h1>Home</h1>
      <div className="container-fluid pt-5">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">Trandy Products</span>
        </h2>
      </div>
      <div className="row px-xl-5 pb-3">
      <div className='d-flex justify-content-between mb-3'>
          <button className='btn btn-primary rounded-2' onClick={()=>setPage(page-1)} disabled={page===1?true:false}><i class="fa-solid fa-arrow-left"></i> Prev</button>
          <button className='btn btn-primary rounded-2' onClick={()=>setPage(page+1)} disabled={page===3?true:false}> Next <i class="fa-solid fa-arrow-right"></i></button>
      </div>
        {loading===true && (<div class="spinner-border m-auto text-primary" role="status">
  <span class="sr-only">Loading...</span></div>)}
        {!loading && products.map((item,index)=>{
          return(<div className="col-lg-4 col-md-6 col-sm-12 pb-1">
          <div className="card product-item border-0 mb-4">
            <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img className="img-fluid w-100" src={`${Base_URL}/api/v1/product/product-photo/${item._id}`} alt="" />
            </div>
            <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 className="text-truncate mb-3">{item.name}</h6>
              <div className="d-flex justify-content-center">
                <h6>${item.price}</h6>
                <h6 className="text-muted ml-2">
                  <del>${item.price+10 }</del>
                </h6>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-around bg-light border">
              <button onClick={()=>navigate(`/product/${item.slug}`)} className="btn btn-sm text-dark p-0">
                <i className="fas fa-eye text-primary mr-1" />
                View Detail
              </button>
            </div>
          </div>
        </div>)
        })}
        <div className='d-flex justify-content-between'>
          <button className='btn btn-primary rounded-2' onClick={()=>setPage(page-1)} disabled={page===1?true:false}><i class="fa-solid fa-arrow-left"></i> Prev</button>
          <button className='btn btn-primary rounded-2' onClick={()=>setPage(page+1)} disabled={page===3?true:false}> Next <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
      <Footer/>
    </div>
  )
}
