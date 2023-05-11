import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="home_title">
          <h3>Multi-Agency Gas Supply Management System</h3>
        </div>
        <div className="links">
          <Link className="link" to="/">
            <h6>HOME</h6>
          </Link>
          <Link className="link" to="/?cat=contact">
            <h6>CONTACTS</h6>
          </Link>
          <Link className="link" to="/?cat=about">
            <h6>ABOUT US</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
