import profile from "../images/oryx-2.jpg";
import { useEffect, useState } from "react";
import Categories from "../customer/Categories";
import axios from "axios";

const ViewPublished = () => {
  const [data, setData] = useState(Categories);

  useEffect(() => {
    getPublishedGas();
  }, [])

  const getPublishedGas = async () => {
    try {
      const res = await axios.get("")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row g-4 mt-2">
        {data.map((category) => {
            const { id, title, description, price, weight, quantity } = category;
          return (
            <>
              <div className="col-md-4" key={id}>
                <div className="card shadow-lg border-4 border-danger">
                  <img
                    src={profile}
                    alt="Not Found"
                    style={{ width: "18rem" }}
                    className="card-img-top w-100 p-1"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <hr className="bg-primary rounded-5" style={{height: "5px"}} />
                    <p><b>Gas Weight: </b> {weight} Kg</p>
                    <p>
                      <b>Remains: </b>{quantity}
                    </p>
                    <p>
                      <b>Price: </b>{price}/-
                    </p>
                    <p className="card-text">
                      {description}
                    </p>
                    <button className="btn btn-dark">Buy Now</button>
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

export default ViewPublished;
