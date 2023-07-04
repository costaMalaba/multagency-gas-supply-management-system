import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import profile from "../images/oryx-2.jpg";

const WholeSalerDashboard = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.clear();
        setTimeout(() => {
            navigate("/");
            toast.success("Logged Out");
        },1000)
    }

    const username = sessionStorage.getItem('username');

  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <Link to="/dashboard/saler/home" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <p className="text-center bg-white rounded-circle text-danger fs-3 p-3 fw-bolder">MAG SUPPLY</p>
                </Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start fs-4 fw-semibold" id="menu">
                    <li className="nav-item">
                        <Link to="/dashboard/saler/home" className="nav-link align-middle px-0 text-white">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-bag-check"></i> <span className="ms-1 d-none d-sm-inline">Order</span></Link>
                        <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="" className="nav-link px-0"> <span className="d-none d-sm-inline text-light">View Orders</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="#submenu" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-file-medical"></i> <span className="ms-1 d-none d-sm-inline">Publish</span></Link>
                        <ul className="collapse nav flex-column ms-1" id="submenu" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to={`/dashboard/saler/publish/view/${username}`} className="nav-link px-0"> <span className="d-none d-sm-inline text-light">View Published List</span></Link>
                            </li>
                            <li>
                                <Link to="/dashboard/saler/publish" className="nav-link px-0"> <span className="d-none d-sm-inline text-light">Add Publish</span></Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col p-0 m-0 dashboard_content">
            <div className="p-2 d-flex justify-content-center shadow text-white content">
              <h3 className="fw-bold text-light mx-5 py-1">Mult-Agency Gas supply Management System</h3>
              <div className="dropdown ms-auto py-2">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={profile} alt="hugenerd" width="30" height="30" className="rounded-circle" />
                        <span className="d-none d-sm-inline mx-1">{username}</span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><Link className="dropdown-item" to="#">Settings</Link></li>
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

export default WholeSalerDashboard;
