import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import { v4 as uuid } from "uuid";

const RetailerAddPublish = () => {
  const [inputs, setInputs] = useState({
    gas_id: uuid(),
    brand: "",
    branch: "",
    weight: "",
    price: "",
    quantity: "",
    phone_no: "",
    description: "",
    image: "",
    creator: sessionStorage.getItem('username'),
    role: sessionStorage.getItem('role'),
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("gas_id", inputs.gas_id);
    formdata.append("brand", inputs.brand);
    formdata.append("branch", inputs.branch);
    formdata.append("weight", inputs.weight);
    formdata.append("price", inputs.price);
    formdata.append("quantity", inputs.quantity);
    formdata.append("phone_no", inputs.phone_no);
    formdata.append("description", inputs.description);
    formdata.append("image", inputs.image);
    formdata.append("creator", inputs.creator);
    formdata.append("role", inputs.role);
    try {
      await axios.post(
        "http://localhost:8900/gas/add",
        formdata
      ).then(res => {
        if (res.data.Status === "Success") {
          navigate(`/dashboard/retailer/publish/view/${inputs.creator}`);
          toast.success(res.data.Message);
          console.log(res.data)
        } else {
          navigate("/dashboard/retailer/publish");
          toast.warning(res.data.Message);
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="conatiner-fluid py-5">

      <div className="row g-0">
      <div className="col-3"></div>

      <div className="card bg-light border-0 col-6 shadow-lg">
        <div className="card-header text-center bg-info">
          <h1 className="py-3 fs-2">Add order for Customer</h1>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="form">
            
            <div className="px-5 mx-5">
            <div className="col mb-5">
              <label htmlFor="brand" className="col-form-label fw-bold">
                Brand:
              </label>
              <select
                className="form-select text-center"
                id="brand"
                name="brand"
                onChange={handleChange}
                required
              >
                <option className="text-muted" defaultValue={"Uknown"}>
                  Select Here
                </option>
                <option value={"Oryx"}>Oryx</option>
                <option value={"Taifa"}>Taifa</option>
                <option value={"Mihan"}>Mihan</option>
              </select>
            </div>

            <div className="col mb-5">
                <label htmlFor="branch" className="form-label fw-bold">
                  Branch:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="branch"
                  name="branch"
                  onChange={handleChange}
                  required
                />
              </div>

            <div className="col mb-5">
              <label htmlFor="weight" className="col-form-label fw-bold">
                Weight:
              </label>
              <select
                className="form-select text-center"
                id="weight"
                name="weight"
                onChange={handleChange}
                required
              >
                <option className="text-muted" defaultValue={"Uknown"}>
                  Select Here
                </option>
                <option value={3.5}>3.5 Kg</option>
                <option value={5}>5 Kg</option>
                <option value={8}>8 Kg</option>
              </select>
            </div>

              <div className="col mb-5">
                <label htmlFor="price" className="form-label fw-bold">
                  Price:
                </label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="price"
                  name="price"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col mb-5">
                <label htmlFor="quantity" className="form-label fw-bold">
                  Quantiny:
                </label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col mb-5">
              <label htmlFor="phone_no" className="form-label fw-bold">
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
                <label htmlFor="description" className="form-label fw-bold">
                  Description:
                </label>
                <textarea
                  rows={5}
                  placeholder="Leave Your Comment Here"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  
                />
              </div>

              <div className="col mb-5">
                <label htmlFor="image" className="form-label fw-bold">
                  Select Image:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={e => setInputs({...inputs, image: e.target.files[0]})}
                  required
                />
              </div>
            </div>

            <div className="text-center">
            <button className="btn btn-success btn-lg fw-bold mb-5">
              Publish
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

export default RetailerAddPublish;
