import React from 'react';
import '../css/style.css';
import { NavLink } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authDetails } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch()
  const auth = JSON.parse(localStorage.getItem('auth')) || {user:''};
  const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
  const handleLogout = () => {
    dispatch(setAuth([null,'']))
    localStorage.clear()
  }
  return (
    <div>
        <div className="container-fluid">
  <div className="row bg-secondary py-2 px-xl-5">
    <div className="col-lg-6 d-none d-lg-block">
      <div className="d-inline-flex align-items-center">
        <Link className="text-dark" href="">
          FAQs
        </Link>
        <span className="text-muted px-2">|</span>
        <Link className="text-dark" href="">
          Help
        </Link>
        <span className="text-muted px-2">|</span>
        <Link className="text-dark" href="">
          Support
        </Link>
      </div>
    </div>
    <div className="col-lg-6 text-center text-lg-right">
      <div className="d-inline-flex align-items-center">
        <Link className="text-dark px-2" href="">
          <FaFacebookF style={{fontSize:'20px'}}/>
        </Link>
        <Link className="text-dark px-2" href="">
          <FaTwitter style={{fontSize:'20px'}}/>
        </Link>
        <Link className="text-dark px-2" href="">
          <FaLinkedin style={{fontSize:'20px'}}/>
        </Link>
        <Link className="text-dark px-2" href="">
          <FaInstagram style={{fontSize:'20px'}}/>
        </Link>
        <Link className="text-dark pl-2" href="">
          <FaYoutube style={{fontSize:'20px'}}/>
        </Link>
      </div>
    </div>
  </div>
  <div className="row align-items-center py-3 px-xl-5">
    <div className="col-lg-3 d-none d-lg-block">
      <Link href="" className="text-decoration-none">
        <h1 className="m-0 display-5 font-weight-semi-bold">
          <span className="text-primary font-weight-bold border px-3 mr-1">
            E
          </span>
          Commerce
        </h1>
      </Link>
    </div>
    <div className="col-lg-9">
  <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
    <Link href="" className="text-decoration-none d-block d-lg-none">
      <h1 className="m-0 display-5 font-weight-semi-bold">
        <span className="text-primary font-weight-bold border px-3 mr-1">
          E
        </span>
        Commerce
      </h1>
    </Link>
    <button
      type="button"
      className="navbar-toggler"
      data-toggle="collapse"
      data-target="#navbarCollapse"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div
      className="collapse navbar-collapse justify-content-between"
      id="navbarCollapse"
    >
      <div className="navbar-nav mr-auto py-0">
        <NavLink to='/' exact activeClassName='active' className="nav-item nav-link">
          Home
        </NavLink>
        <NavLink to="/cart" activeClassName='active' className="nav-item nav-link">
          Cart
        </NavLink>
        <NavLink to={`/dashboard/${auth.user.role===0?"user":"admin"}/profile`} activeClassName='active' className="nav-item nav-link">
          Dashboard
        </NavLink>
        <NavLink to='/contact' className="nav-item nav-link">
          Contact
        </NavLink>
      </div>
      <div className="navbar-nav ml-auto py-0">
      {!auth?.user?
        (<>
          <NavLink to='/signin' activeClassName="active" className="nav-item nav-link">
            Login
          </NavLink>
          <NavLink to="/signup" activeClassName="active" className="nav-item nav-link">
            Register
          </NavLink>
        </>):(
          <Link to="/signin" onClick={handleLogout} className="nav-item nav-link">
            Logout
          </Link>
        )
      }
      </div>
    </div>
  </nav>
</div>

  </div>
</div>

    </div>
  )
}
