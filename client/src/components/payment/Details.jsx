import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const PaymentDetails = () => {
  const role = sessionStorage.getItem('role');
  const [orders, setOrders] = useState([]);
  const username = sessionStorage.getItem("username");
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    await axios
      .get(`http://localhost:8900/order/get?term=${username}&term1=${id}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setOrders(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid p-5">
      <table className="table table-striped fs-5 bg-light shadow">
        <thead>
          <tr className="text-center fs-4 bg-info text-dark">
            <th colSpan={12} className="p-3">
              Payment Details
            </th>
          </tr>
          <tr className="ext-dark">
            <th scope="col" className="p-3">
              #
            </th>
            {role === "2" && <th scope="col" className="p-3">
              To
            </th>}
            {role !== "2" && <th scope="col" className="p-3">
              Name
            </th>}
            <th scope="col" className="p-3">
              Image
            </th>
            <th scope="col" className="p-3">
              Total Price
            </th>
            <th scope="col" className="p-3">
              Status
            </th>
            <th scope="col" className="p-3 text-center">Last Time Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={index}>
                <td className="fw-bold p-3">{index + 1}</td>
                {role === "2" && <td className="p-3 text-uppercase">{order.creator}</td>}
                {role !== "2" && <td className="p-3">{order.customer_username}</td>}
                <td className="">
                  <img
                    src={`http://localhost:8900/images/` + order.image}
                    alt="Not Found"
                    style={{ width: "4rem", height: "3rem" }}
                    className="rounded-circle"
                  />
                </td>
                <td className="p-3">{order.total_price}/-</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3 text-center">{moment(order.updated_at).format("DD-MM-YYYY")}</td> 
              </tr>
            );
          })}
        </tbody>
      </table>
      {role === "2" && <Link to="/dashboard/customer/home" className="px-0">
        <button className="btn btn-lg btn-success">
          <i className="bi bi-plus-circle me-2"></i>Add order
        </button>
      </Link>}
      
    </div>
  );
};

export default PaymentDetails;
