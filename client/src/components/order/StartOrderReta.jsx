import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const StartOderRe = () => {
  const [gas, setGas] = useState([]);
  const [retName, setRetName] = useState();
  const [idadi, setIdadi] = useState(1);
  const { id } = useParams();
  const username = sessionStorage.getItem('username');
  const totalPrice = gas.price * idadi;
  const currentRemainedGas = gas.quantity_remain - idadi;

  const data = {
    order_id: uuid(),
    customer_username: username,
    retailer_username: retName,
    gas_id: id,
    quantity: idadi,
    price: totalPrice,
    phone_no: gas.phn_numb,
    email: gas.email,
  };
  console.log(data);

  const dataToUpdate = {
    id,
    currentRemainedGas,
  }

  const navigate = useNavigate();

  useEffect(() => {
    getSingleGases();
  }, []);

  const getSingleGases = async () => {
    await axios.get(`http://localhost:8900/gas/get/single/retailer/${id}`).then((res) => {
      setGas(res.data.Result[0]);
      setRetName(res.data.Result[0].creator);
    });
  };

  const updateGas = async () => {
    try {
        await axios.put(`http://localhost:8900/gas/update/${id}`, dataToUpdate)
    } catch (error) {
        console.log(error);
    }
  }

  const handleMakeOrder = async () => {
    if (
      window.confirm(
        `Are you sure you want to place this order of ${idadi} gases`
      )
    ) {
      try {
        await axios
          .post(`http://localhost:8900/order/add`, data)
          .then((res) => {
            if (res.data.Status === "Success") {
              setTimeout(() => {
                navigate("/dashboard/retailer/view/order");
                toast.success(res.data.Message);
              },1000);
              updateGas();
            } else {
              navigate("/dashboard/customer/order/:id");
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-3"></div>
        <div className="card col-6 shadow-lg bg-light">
          <img
            src={`http://localhost:8900/images/` + gas.image}
            alt="Not Found"
            style={{ width: "18rem", height: "23rem" }}
            className="card-img-top w-100 p-1"
          />
          <div className="card-body">
            <h5 className="card-title fs-4 text-success text-start">
              <b>{gas.brand}</b>
              <br />
              <b className="text-muted">Branch: {gas.branch}</b>
            </h5>
            <hr className="bg-primary rounded-5" style={{ height: "5px" }} />
            <p className="fs-4">
              <b>Gas Weight: </b>
              {gas.weight}
            </p>
            <p className="fs-4">
              <b>Remains: </b>
              {gas.quantity_remain}
            </p>
            <p className="fs-4 text-success">
              <b>Price: Tsh. </b>
              {gas.price}/-
            </p>
            <p className="card-text fs-5 text-center fw-bold">
              How many Gas You Need to Order:
            </p>
            <div className="row text-center">
              <div className="col-3"></div>
              <div className="col-2">
                <button
                  onClick={() => setIdadi(idadi - 1)}
                  className="btn btn-lg btn-info fw-bolder"
                >
                  -
                </button>
              </div>
              <div className="col-2 fw-bolder">
                <h2>{idadi}</h2>
              </div>
              <div className="col-2">
                <button
                  onClick={() => setIdadi(idadi + 1)}
                  className="btn btn-lg btn-info fw-bolder"
                >
                  +
                </button>
              </div>
              <div className="col-3"></div>
            </div>
            <div className="row text-center pt-4">
              <p className="fs-4 col-auto text-success text-end">
                Total Price: Tsh.
                <b> {totalPrice}/-</b>
              </p>
              <div className="col-4"></div>
              <button
                type="submit"
                onClick={handleMakeOrder}
                className="btn btn-success col-auto"
              >
                Order Now
              </button>
            </div>
          </div>
          <div className="card-footer text-muted text-end">
            {gas.time_taken} Minutes Ago
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default StartOderRe;
