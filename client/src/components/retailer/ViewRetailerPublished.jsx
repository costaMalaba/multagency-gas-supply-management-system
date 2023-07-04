import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {toast } from "react-toastify";

const ViewRetailerPublished = () => {
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete that material ?")) {
      try {
        await axios
          .delete(`http://localhost:8900/material/delete/${id}`)
          .then((res) => {
            if (res.data.Status === "Success") {
              toast.error(res.data.Message);
              setTimeout(() => {
                window.location.reload(true);
              }, 5000);
            } else {
              alert("Error");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row g-4 mt-2">
        {categories.map((category) => {
          // const { id, title, description, price, weight, quantity } = category;
          return (
            <>
              <div className="col-md-4" key={category.id}>
                <div className="card shadow-lg bg-light">
                  <img
                    src={`http://localhost:8900/images/` + category.image}
                    alt="Not Found"
                    style={{ width: "18rem", height: "18rem" }}
                    className="card-img-top w-100 p-1"
                  />
                  <div className="card-body">
                  <h5 className="card-title fs-4 text-success text-start"><b>{category.brand}</b><br /><b className="text-muted">Branch: {category.branch}</b></h5>
                    <hr
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
                    <button
                    onClick={(e) => handleDelete(category.id)}
                    title="Delete"
                    className="btn btn-sm btn-danger me-3"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
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

export default ViewRetailerPublished;
