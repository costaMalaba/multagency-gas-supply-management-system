import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ViewSalerPublished = () => {
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  const getCategories = async () => {
    await axios.get(`http://localhost:8900/gas/get/${id}`).then((res) => {
      setCategories(res.data.Result);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container">
      <div className="row g-4 mt-2">
        {categories.map((category, index) => {
          // const { id, title, description, price, weight, quantity } = category;
          return (
            <>
              <div className="col-md-4" key={index}>
                <div className="card shadow-lg bg-light">
                  <img
                    src={`http://localhost:8900/images/` + category.image}
                    alt="Not Found"
                    style={{ width: "18rem", height: "18rem" }}
                    className="card-img-top w-100 p-1"
                  />
                  <div className="card-body">
                  <h5 className="card-title fs-4 text-success text-start"><b>{category.brand}</b><br /><b className="text-muted">Branch: {category.branch}</b></h5>                    <hr
                      className="bg-primary rounded-5"
                      style={{ height: "5px" }}
                    />
                    <p className="fs-4">
                      <b>Gas Weight: </b>
                      {category.weight} Kg
                    </p>
                    <p className="fs-4 text-success">
                      <b>Price: Tsh. </b>
                      {category.price}/-
                    </p>
                    <p className="fs-4">
                      <b>Remains: </b>
                      {category.quantity}
                    </p>
                    <p className="card-text fs-5">{category.description}</p>
                    <Link to="" className="btn btn-warning me-2">
                        Edit
                    </Link>
                    <button className="btn btn-danger">Delete</button>
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

export default ViewSalerPublished;
