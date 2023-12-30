import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function DashboardSideNav() {
  return (
    <div>
            <a
              className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
            >
              <h6 className="m-0">Dashboard</h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
              id="navbar-vertical"
            >
              <div
                className="navbar-nav w-100 overflow-hidden"
                style={{ height: '100%' }}
              >
                <NavLink to="/dashboard/user/profile" exact activeClassName='active' className="nav-item nav-link">
                  Profile
                </NavLink>
                <NavLink to="/dashboard/user/orders" className="nav-item nav-link">
                  Orders
                </NavLink>
              </div>
            </nav>
          </div>
  )
}
