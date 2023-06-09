import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import profile from "../images/oryx-2.jpg";

const RetailerDashboard = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.clear();
        setTimeout(() => {
            navigate("/");
            toast.success("Logged Out");
        },1000)
    }

    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');

  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                {role === "0" && <Link to={`/dashboard/retailer/publish/view/${username}`} className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <p className="text-center bg-white rounded-circle text-danger fs-3 p-3 fw-bolder">MAG SUPPLY</p>
                </Link>}
                {role === "1" && <Link to="/dashboard/retailer/start/order/2" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <p className="text-center bg-white rounded-circle text-danger fs-3 p-3 fw-bolder">MAG SUPPLY</p>
                </Link>}
                {role === "2" && <Link to="/dashboard/customer/home" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <p className="text-center bg-white rounded-circle text-danger fs-3 p-3 fw-bolder">MAG SUPPLY</p>
            </Link>}
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start fs-4 fw-semibold" id="menu">
                    <li className="nav-item">
                        {role === "0" && <Link to={`/dashboard/retailer/publish/view/${username}`} className="nav-link align-middle px-0 text-white">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>}
                        {role === "1" && <Link to="/dashboard/retailer/start/order/2" className="nav-link align-middle px-0 text-white">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>}
                        {role === "2" && <Link to="/dashboard/customer/home" className="nav-link align-middle px-0 text-white">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>}
                    </li>
                    <li>
                        <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-bag-check"></i> <span className="ms-1 d-none d-sm-inline">Order</span></Link>
                        <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            {(role === "0" || role === "1") && <li className="w-100">
                                <Link to="/dashboard/retailer/view/order" className="nav-link px-0"> <span className="d-none d-sm-inline text-light">Received</span></Link>
                            </li>}
                            {role === "2" && <li className="w-100">
                                <Link to="/dashboard/retailer/view/order" className="nav-link px-0"> <span className="d-none d-sm-inline text-light">View</span></Link>
                            </li>}
                            {role === "1" && <li className="w-100">
                                <Link to="/dashboard/retailer/view/order/sent/0" className="nav-link px-0"> <span className="d-none d-sm-inline text-light">Sent</span></Link>
                            </li>}
                            {role === "1" && <li>
                                <Link to="/dashboard/retailer/start/order/2" className="nav-link px-0"> <span className="d-none d-sm-inline text-light">Make Order</span></Link>
                            </li>}
                        </ul>
                    </li>
                    {(role === "0" || role === "1") && <li>
                        <Link to="#submenu" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-file-medical"></i> <span className="ms-1 d-none d-sm-inline">Publish</span></Link>
                        <ul className="collapse nav flex-column ms-1" id="submenu" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to={`/dashboard/retailer/publish/view/${username}`} className="nav-link px-0"> <span className="d-none d-sm-inline text-light">View Published List</span></Link>
                            </li>
                            <li>
                                <Link to="/dashboard/retailer/publish" className="nav-link px-0"> <span className="d-none d-sm-inline text-light">Add Publish</span></Link>
                            </li>
                        </ul>
                    </li>}
                    <li>
                        <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-credit-card"></i> <span className="ms-1 d-none d-sm-inline">Payment</span></Link>
                        <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li>
                                <Link to="/dashboard/retailer/view/order/payment" className="nav-link px-0"> <span className="d-none d-sm-inline text-light">View</span></Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col p-0 m-0 dashboard_content bg-light">
            <div className="p-2 d-flex justify-content-center shadow text-white content">
              {(role === "0" || role === "1") ? <h3 className="fw-bold text-light mx-5 py-1">Mult-Agency Gas supply Management System</h3> : <h3 className="text-info fw-bold ms-4">Let's Shop</h3>}
              <div className="dropdown ms-auto py-2">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={profile} alt="hugenerd" width="30" height="30" className="rounded-circle" />
                        <span className="d-none d-sm-inline mx-1">{username}</span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><Link className="dropdown-item" to="#">Your Profile</Link></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><button onClick={handleLogOut} className="dropdown-item btn">Log out</button></li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    </div>
</div>
  )
}

export default RetailerDashboard;
