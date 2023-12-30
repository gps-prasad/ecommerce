import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({searchProduct,categories,filterProduct}) {
  const [keyword,setKeyword] = useState('');
  const navigate = useNavigate();
  const [cartTotal,setCartTotal] = useState(0)
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState('');
  const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };


  return (
    <div className="container-fluid">
        <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 col-12 mb-2">
      <a
        className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
        data-toggle="collapse"
        href="#navbar-vertical"
        style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
      >
        <h6 className="m-0">Filters</h6>
        <i className="fa fa-angle-down text-dark" />
      </a>
      <nav
        className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light shadow-sm"
        id="navbar-vertical"
        style={{ width: "calc(100% - 30px)", zIndex: 2 }}
      >
        <div
          className="navbar-nav w-100 overflow-hidden"
          style={{ height: "100%" }}
        >
        <div className="mt-25 custom-control custom-checkbox h-100">
          <ul style={{listStyleType:'none', marginTop:'20px'}}>
          {categories.map((category,item)=>{
            return (<li><input
              type="checkbox"
              className="custom-control-input"
              id={category._id}
              onChange={(e) => handleFilter(e.target.checked, category._id)}
          />
          <label className="custom-control-label" htmlFor={category._id}>
              {category.name}
          </label><br/></li>)
          })}</ul>
        </div>
        <div className="mt-25 custom-control custom-radio h-100">
          <ul style={{listStyleType:'none', marginTop:'20px'}}>
          <li><input
              type="radio"
              className="custom-control-input"
              id='0-9'
              value='[0,9]'
              name='price'
              onChange={(e) => setRadio(e.target.value)}
          />
          <label className="custom-control-label" htmlFor='0-9'>
              $0 - $9
          </label><br/></li>
          <li><input
              type="radio"
              className="custom-control-input"
              id='10-99'
              name='price'
              value='[10,99]'
              onChange={(e) => setRadio(e.target.value)}
          />
          <label className="custom-control-label" htmlFor='10-99'>
              $10 - $99
          </label><br/></li>
          <li><input
              type="radio"
              className="custom-control-input"
              id='100-999'
              name='price'
              value='[100,999]'
              onChange={(e) => setRadio(e.target.value)}
          />
          <label className="custom-control-label" htmlFor='100-999'>
              $100 - $999
          </label><br/></li>
          </ul>
          <button className='btn btn-primary px-3 mb-3 rounded-5' onClick={()=>filterProduct(checked,radio)}>Apply</button>
          <button className='btn btn-primary px-3 mb-3 rounded-5' onClick={()=>navigate('/')}>Reset</button>
        </div>
        </div>
      </nav>
      </div>
          <div className="col-lg-6 col-6 text-left">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products"
          value={keyword}
          onChange={(e)=>setKeyword(e.target.value)}
        />
        <div className="input-group-append" style={{cursor:'pointer'}}>
          <span className="input-group-text bg-transparent text-primary">
            <FaSearch onClick={()=>searchProduct(keyword)} style={{fontSize:'20px'}}/>
          </span>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-6 text-right">
      <Link to={'/cart'} className="btn border text-primary">
      <i class="fa-solid fa-cart-shopping"></i>
      </Link>
    </div>
    </div>
    </div>
  )
}
