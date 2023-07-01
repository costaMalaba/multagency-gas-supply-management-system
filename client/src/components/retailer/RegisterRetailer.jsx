import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import { v4 as uuid } from "uuid";

const RegisterRetailer = () => {
  const [inputs, setInputs] = useState({
    id: uuid(),
    role: "",
    name: "",
    phone_no: "",
    email: "",
    username: "",
    password: "",
  });

  //const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8900/register", inputs);
      if (res.data.Status === "Success") {
        navigate("/");
        toast.success(res.data.Message);
      } else {
        navigate("/register");
        toast.warning(res.data.Message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(inputs);

  return (
    <div className="conatiner-fluid cover-1">
      <div className="p-5">
        <Link to="/" className="">
          <button className="btn btn-sm btn-lg btn-primary">BACK</button>
        </Link>
      </div>

      <div className="row g-0">
        <div className="col-3"></div>

        <div className="card col-6 shadow-lg bg-light border-0">
          <div className="card-header text-center bg-info">
            <h1 className="py-3 fs-2 text-white">Register Here</h1>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="form">
              <div className="px-5 mx-5">
                <div className="col mb-5">
                  <label for="role" className="col-form-label fw-bold">
                    Register As:
                  </label>
                  <select
                    className="form-select text-center"
                    id="role"
                    name="role"
                    onChange={handleChange}
                    required
                  >
                    <option selected defaultValue={"Uknown"} disabled>
                      Select Here
                    </option>
                    <option value={2}>Customer</option>
                    <option value={1}>Retailer</option>
                    <option value={0}>Wholesaler</option>
                  </select>
                </div>

                <div className="col mb-5">
                  <label for="name" className="form-label fw-bold">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col mb-5">
                  <label for="phone_no" className="form-label fw-bold">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    placeholder="eg. 075444.."
                    className="form-control"
                    id="phone_no"
                    name="phone_no"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col mb-5">
                  <label for="email" className="form-label fw-bold">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col mb-5">
                  <label for="username" className="form-label fw-bold">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col mb-3">
                  <label for="password" className="form-label fw-bold">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="text-center">
                <button className="btn btn-success btn-lg fw-bold mb-5">
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="clo-3"></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRetailer;
