import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SalerCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await axios.get("http://localhost:8900/gas/saler/get").then((res) => {
      setCategories(res.data.Result);
    });
  };

  return (
    <div className="container">
      <div className="row g-4 mt-2">
        {categories.map((category) => {
          return (
            <>
              <div className="col-md-4" key={category.id}>
                <div className="card shadow-lg bg-light border-0">
                  <img
                    src={`http://localhost:8900/images/` + category.image}
                    alt="Not Found"
                    style={{ width: "18rem", height: "18rem" }}
                    className="card-img-top w-100 p-1"
                  />
                  <div className="card-body">
                    <h5 className="card-title fs-4 text-success text-start">
                      <b>{category.brand}</b>
                      <br />
                      <b className="text-muted">Branch: {category.branch}</b>
                      <br />
                      <p className="fs-4 fw-bold text-info">Seller: {category.username}</p>
                    </h5>
                    <hr
                      className="bg-primary rounded-5"
                      style={{ height: "5px" }}
                    />
                    <p className="fs-4">
                      <b>Gas Weight: </b>
                      {category.weight}
                    </p>
                    <p className="fs-4">
                      <b>Remains: </b>
                      {category.quantity_remain}
                    </p>
                    <p className="fs-4 text-success">
                      <b>Price: Tsh. </b>
                      {category.price}/-
                    </p>
                    <p className="card-text fs-5">{category.description}</p>
                    <Link to={`/dashboard/customer/order/${category.gas_id}`}>
                      <div className="btn btn-success">Start Your Order</div>
                    </Link>
                  </div>
                  <div className="card-footer text-muted text-end">
                    {category.time_taken} Minutes Ago
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SalerCategory;
