import React, { useEffect, useState } from "react";
import axios from "axios";

const DashNavbar = () => {
  const [order, setOrder] = useState();
  const [customer, setCustomer] = useState();

  useEffect(() => {
    getOrderCount();
    getCustomerCount();
  }, []);

  const getOrderCount = async () => {
    await axios.get("http://localhost:8900/order/count").then((res) => {
      setOrder(res.data.Result[0].orders);
    });
  };

  const getCustomerCount = async () => {
    await axios.get("http://localhost:8900/order/count").then((res) => {
      setCustomer(res.data.Result[0].orders);
    });
  };

  return (
    <div className="p-5 bg-primary">
      <div className="container-fluid">
        <div className="row">
        <div className="col-12 col-sm-6 colmd-4 col-lg-3">
            <div className="d-flex justify-content-around align-items-center p-3 bg-info rounded-3 border-secondary shadow-lg">
              <i className="bi bi-bag-check fs-1 text-light"></i>
              <div className="text-light">
                <p className="fs-1">
                  <strong>Orders</strong>
                </p>
                <h2 className="text-center">{order}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 colmd-4 col-lg-3">
            <div className="d-flex justify-content-around align-items-center p-3 bg-info rounded-3 border-secondary shadow-lg">
              <i className="bi bi-people fs-1 text-light"></i>
              <div className="text-light">
                <p className="fs-1">
                  <strong>Customers</strong>
                </p>
                <h2 className="text-center">{customer}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;