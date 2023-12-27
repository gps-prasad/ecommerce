import React,{useState,useEffect} from 'react';
import axios from "axios";
import { addCart, removeCart } from '../store/slices/cartSlice.jsx';
import { cartDetails } from '../store/slices/cartSlice.jsx';
import { useSelector,useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import '../components/css/style.css';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [frd,setFrd] = useState(0);
    const [product, setProduct] = useState({});
    const [isInCart,setIsInCart] = useState(false)
    const [relatedProducts, setRelatedProducts] = useState([]);
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';

    useEffect(() => {
        if (params?.slug) {
            getProduct()
        };
      }, [params.slug]);

    useEffect(()=>{
        const existingItemsString = localStorage.getItem('items');
        const cart = existingItemsString ? JSON.parse(existingItemsString) : [];
        
        if (frd>0){cart.map(({cartProduct},index)=>{
            if (cartProduct._id===product._id){
                setIsInCart(true)
            }
            console.log(product)
        })
        getRelatedProduct();
    }
        else{
            setFrd(()=>frd+1)
        }
    },[product])


    const getProduct = async () => {
        try {
            const { data } = await axios.get(
            `${Base_URL}/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data.product)
            // getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    const getRelatedProduct = async () => {
        try {
            const { data } = await axios.get(
            `${Base_URL}/api/v1/product/related-product/${product._id}/${product.category._id}`
            );
            setRelatedProducts(data.products)
            console.log(relatedProducts)
        } catch (error) {
            console.log(error);
        }
    };

    const addCart=()=>{
        const existingItemsString = localStorage.getItem('items');
        const existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];
        const newItem = { cartProduct:product,quantity:1 };
        const updatedItems = [...existingItems, newItem];
        localStorage.setItem('items', JSON.stringify(updatedItems));
        toast.success('added to cart')
    }


  return (
    <div>
        <Toaster/>
        <div className="container-fluid py-5">
        <div className="row px-xl-5">
            <div className="col-lg-5 pb-5">
            <div
                id="product-carousel"
                className="carousel slide"
                data-ride="carousel"
            >
                <div className="carousel-inner border">
                <div className="carousel-item active">
                    <img className="w-100 h-100" src={`${Base_URL}/api/v1/product/product-photo/${product._id}`} alt="Image" />
                </div>
                </div>
                <a
                className="carousel-control-prev"
                href="#product-carousel"
                data-slide="prev"
                >
                <i className="fa fa-2x fa-angle-left text-dark" />
                </a>
                <a
                className="carousel-control-next"
                href="#product-carousel"
                data-slide="next"
                >
                <i className="fa fa-2x fa-angle-right text-dark" />
                </a>
            </div>
            </div>
            <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{product.name}</h3>
            <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                <small className="fas fa-star" />
                <small className="fas fa-star" />
                <small className="fas fa-star" />
                <small className="fas fa-star-half-alt" />
                <small className="far fa-star" />
                </div>
                <small className="pt-1">(50 Reviews)</small>
            </div>
            <h3 className="font-weight-semi-bold mb-4">${product.price}</h3>
            <p className="mb-4">
                Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam
                stet sit clita ea. Sanc invidunt ipsum et, labore clita lorem magna
                lorem ut. Erat lorem duo dolor no sea nonumy. Accus labore stet, est
                lorem sit diam sea et justo, amet at lorem et eirmod ipsum diam et rebum
                kasd rebum.
            </p>
            {isInCart?
            (<><h2>Added to cart</h2>
                <div className="d-flex align-items-center mb-4 pt-2">
                    <button onClick={()=>navigate('/cart')} className="btn btn-primary px-3">
                    <i className="fa fa-shopping-cart mr-1" /> Go To Cart
                    </button>
                </div>
            </>
            ):(
                <div className="d-flex align-items-center mb-4 pt-2">
                    <button onClick={()=>{
                        addCart()
                        setIsInCart(true)
                    }} className="btn btn-primary px-3">
                    <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                    </button>
                </div>
            )}
            <div className="d-flex pt-2">
                <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                <div className="d-inline-flex">
                <a className="text-dark px-2" href="">
                    <i className="fab fa-facebook-f" />
                </a>
                <a className="text-dark px-2" href="">
                    <i className="fab fa-twitter" />
                </a>
                <a className="text-dark px-2" href="">
                    <i className="fab fa-linkedin-in" />
                </a>
                <a className="text-dark px-2" href="">
                    <i className="fab fa-pinterest" />
                </a>
                </div>
            </div>
            </div>
        </div>
        <div className="container-fluid py-5">
  <div className="text-center mb-4">
    <h2 className="section-title px-5">
      <span className="px-2">You May Also Like</span>
    </h2>
  </div>
    <div className='row'>
        {relatedProducts.map((product,index)=>{
            return (        <div className="card product-item border-0 col-lg-3 col-md-6 col-sm-12">
            <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img className="img-fluid w-100" src={`${Base_URL}/api/v1/product/product-photo/${product._id}`} alt="" />
            </div>
            <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 className="text-truncate mb-3">{product.name}</h6>
              <div className="d-flex justify-content-center">
                <h6>${product.price}</h6>
                <h6 className="text-muted ml-2">
                  <del>${product.price}</del>
                </h6>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-center bg-light border">
              <a href="" className="btn btn-sm text-dark p-0" onClick={()=>navigate(`/product/${product.slug}`)}>
                <i className="fas fa-eye text-primary mr-1" />
                View Detail
              </a>
            </div>
          </div>)
        })}
    </div>
</div>
        <div className="row px-xl-5">
            <div className="col">
            <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                <a
                className="nav-item nav-link active"
                data-toggle="tab"
                href="#tab-pane-1"
                >
                Description
                </a>
                <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">
                Information
                </a>
                <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">
                Reviews (0)
                </a>
            </div>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-pane-1">
                <h4 className="mb-3">Product Description</h4>
                <p>
                    Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea.
                    Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam
                    ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed
                    sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam.
                    Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum
                    accusam sadipscing, eos dolores sit no ut diam consetetur duo justo
                    est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor
                    accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt
                    tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea
                    invidunt.
                </p>
                <p>
                    Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum.
                    Amet dolore tempor consetetur sed lorem dolor sit lorem tempor.
                    Gubergren amet amet labore sadipscing clita clita diam clita. Sea
                    amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum.
                    Ea erat sed et diam takimata sed justo. Magna takimata justo et amet
                    magna et.
                </p>
                </div>
                <div className="tab-pane fade" id="tab-pane-2">
                <h4 className="mb-3">Additional Information</h4>
                <p>
                    Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea.
                    Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam
                    ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed
                    sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam.
                    Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum
                    accusam sadipscing, eos dolores sit no ut diam consetetur duo justo
                    est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor
                    accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt
                    tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea
                    invidunt.
                </p>
                <div className="row">
                    <div className="col-md-6">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">
                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                        </li>
                        <li className="list-group-item px-0">
                        Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                        </li>
                        <li className="list-group-item px-0">
                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                        </li>
                        <li className="list-group-item px-0">
                        Takimata ea clita labore amet ipsum erat justo voluptua.
                        Nonumy.
                        </li>
                    </ul>
                    </div>
                    <div className="col-md-6">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">
                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                        </li>
                        <li className="list-group-item px-0">
                        Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                        </li>
                        <li className="list-group-item px-0">
                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                        </li>
                        <li className="list-group-item px-0">
                        Takimata ea clita labore amet ipsum erat justo voluptua.
                        Nonumy.
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                <div className="row">
                    <div className="col-md-6">
                    <h4 className="mb-4">1 review for "Colorful Stylish Shirt"</h4>
                    <div className="media mb-4">
                        <img
                        src="img/user.jpg"
                        alt="Image"
                        className="img-fluid mr-3 mt-1"
                        style={{ width: 45 }}
                        />
                        <div className="media-body">
                        <h6>
                            John Doe
                            <small>
                            {" "}
                            - <i>01 Jan 2045</i>
                            </small>
                        </h6>
                        <div className="text-primary mb-2">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                            <i className="far fa-star" />
                        </div>
                        <p>
                            Diam amet duo labore stet elitr ea clita ipsum, tempor
                            labore accusam ipsum et no at. Kasd diam tempor rebum magna
                            dolores sed sed eirmod ipsum.
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <h4 className="mb-4">Leave a review</h4>
                    <small>
                        Your email address will not be published. Required fields are
                        marked *
                    </small>
                    <div className="d-flex my-3">
                        <p className="mb-0 mr-2">Your Rating * :</p>
                        <div className="text-primary">
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                        </div>
                    </div>
                    <form>
                        <div className="form-group">
                        <label htmlFor="message">Your Review *</label>
                        <textarea
                            id="message"
                            cols={30}
                            rows={5}
                            className="form-control"
                            defaultValue={""}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="name">Your Name *</label>
                        <input type="text" className="form-control" id="name" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="email">Your Email *</label>
                        <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="form-group mb-0">
                        <input
                            type="submit"
                            defaultValue="Leave Your Review"
                            className="btn btn-primary px-3"
                        />
                        </div>
                    </form>
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
