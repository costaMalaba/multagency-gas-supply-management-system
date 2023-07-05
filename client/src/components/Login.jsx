import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../services/loadingPage.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    role: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios
        .post("http://localhost:8900/auth/login", inputs)
        .then((res) => {
          if (res.data.Status === "R_Success") {
            sessionStorage.setItem('username', res.data.Result[0].username);
            sessionStorage.setItem('role', res.data.Result[0].role);

            setTimeout(() => {
              navigate("/dashboard/retailer/home");
              toast.success(res.data.Message);
            }, 500);
          } else if (res.data.Status === "W_Success") {
            sessionStorage.setItem('username', res.data.Result[0].username);
            sessionStorage.setItem('role', res.data.Result[0].role);

            setTimeout(() => {
              window.location.href = "/dashboard/retailer/home";
              toast.success(res.data.Message);
            }, 500);
          } else if (res.data.Status === "C_Success") {
            sessionStorage.setItem('username', res.data.Result[0].username);
            sessionStorage.setItem('role', res.data.Result[0].role);

            setTimeout(() => {
              window.location.href = "/dashboard/retailer/home";
              toast.success(res.data.Message);
            }, 500);
          } else {
            toast.success(res.data.Message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(inputs);

  return (
    <div className="container-fluid cover-1 vh-100 loading-page">
      <div className="text-primary text-center shadow-lg rounded-bottom header-1">
        <h1 className="h-txt py-5 text-light">
          Mult-Agency Gas supply Management System
        </h1>
      </div>

      <div className="row my-5">
        <div className="col-3"></div>

        <div className="card col-6 border-0 shadow bg-light">
          <div className="card-header bg-light text-center fs-2 fw-bolder text-danger">
            <p>MAG SUPPLY</p>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="text-center">
              <h3 className="login">Login Here</h3>
              <div className="row">
                <div className="col-4"></div>
              <div className="mt-3 col-4">
                <label
                  htmlFor="role"
                  className="col-form-label fw-bolder text-info"
                >
                  Login As:
                </label>
                <select
                  className="form-select text-center fw-bolder"
                  id="role"
                  name="role"
                  onChange={handleChange}
                  required
                >
                  <option className="text-muted" defaultValue={"Uknown"}>
                    Select Here
                  </option>
                  <option value={2}>Customer</option>
                  <option value={1}>Retailer</option>
                  <option value={0}>Wholesaler</option>
                </select>
              </div>
              <div className="col-4"></div>
              </div>

              <div className="mb-5 mt-5">
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control-lg text-center fw-bold border-top-0 border-start-0 border-end-0 border-success rounded-0"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control-lg text-center fw-bold border-top-0 border-start-0 border-end-0 border-success rounded-0"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn btn-success btn-lg fw-bold mb-4 w-25">
                Login
                {isLoading && (
                  <p className="loading-circle ms-auto mb-0 mt-0"></p>
                )}
              </button>

              <span>
                <p>
                  Don't Have Account? <Link to="register">Register here</Link>
                </p>
              </span>
            </form>
          </div>
        </div>
      </div>

      <div className="col-3"></div>
    </div>
  );
};

export default Login;
