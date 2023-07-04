import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const CustomerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [creator, setCreator] = useState();
  const username = sessionStorage.getItem("username");
  console.log(creator)

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    await axios
      .get(`http://localhost:8900/order/get?term=${username}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setOrders(res.data.Result);
          setCreator(res.data.Result[0].creator);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = async (e) => {
    let searchTerm = e.target.value;
    await axios
      .get(`http://localhost:8900/order/search?term=${searchTerm}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setOrders(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  };

  // const handlePayment = async (price) => {
  //   try {
  //     // Make a POST request to your backend endpoint that initiates the payment
  //     const response = await axios.post("http://localhost:8900/gas/pay", {
  //       tx_ref: uuid(),
  //       amount: price, // Set the amount for the payment
  //       email: "costantineyohana1999@gmail.com", // Set the customer's email
  //       currency: "TZS",
  //       // Include any other required parameters
  //     });

  //     // Retrieve the payment URL from the response
  //     const paymentUrl = response.data.paymentUrl;

  //     // Redirect the user to the Flutterwave payment page
  //       window.location.href = paymentUrl;

  //     // window.location.href = paymentUrl;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete that order ?")) {
      try {
        await axios
          .delete(`http://localhost:8900/order/delete/${id}`)
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

  const handlePay = (price) => {
    window.location.href = "#";
  };

  return (
    <div className="container-fluid p-5">
      <input
        type=""
        onChange={handleSearch}
        placeholder="Search order"
        className="form-control text-center my-3 fs-4"
      />
      <table className="table table-striped fs-5 bg-light shadow">
        <thead>
          <tr className="text-center fs-4 bg-info text-dark">
            <th colSpan={10} className="p-3">
              List of Orders
            </th>
          </tr>
          <tr className="ext-dark">
            <th scope="col" className="p-3">
              #
            </th>
            <th scope="col" className="p-3">
              Name
            </th>
            <th scope="col" className="p-3">
              Image
            </th>
            <th scope="col" className="p-3">
              Gas Brand
            </th>
            <th scope="col" className="p-3">
              Gas Weight
            </th>
            <th scope="col" className="p-3 text-center">
              Quantity
            </th>
            <th scope="col" className="p-3">
              Total Price
            </th>
            <th scope="col" className="p-3">
              Status
            </th>
            <th scope="col" className="p-3 text-center">Last Time Created</th>
            <th scope="col" className="p-3 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={index}>
                <td className="fw-bold p-3">{index + 1}</td>
                <td className="p-3">{order.customer_username}</td>
                <td className="">
                  <img
                    src={`http://localhost:8900/images/` + order.image}
                    alt="Not Found"
                    style={{ width: "4rem", height: "3rem" }}
                    className="rounded-circle"
                  />
                </td>
                <td className="p-3 text-uppercase">{order.brand}</td>
                <td className="p-3">{order.weight}</td>
                <td className="p-3 text-center">{order.quantity}</td>
                <td className="p-3">{order.total_price}/-</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3 text-center">{moment(order.updated_at).format("DD-MM-YYYY")}</td>
                  {order.customer_username === username && <td className="p-3 text-center">
                  <Link to="/dashboard/customer/view/order/pay">
                    <button className="btn btn-info btn-sm fw-bold me-2">
                      Lipa Kwa Simu
                    </button>
                  </Link>
                  <button
                    type="submit"
                    onClick={() => handlePay(order.total_price)}
                    // onClick={() => handlePayment(order.total_price)}
                    className="btn btn-sm btn-success"
                  >
                    Pay Now
                  </button>
                    </td>}

                    {order.creator === username && <td className="p-3 text-center">
                    <button
                    onClick={(e) => handleDelete(order.order_id)}
                    title="Delete"
                    className="btn btn-sm btn-danger me-3"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                    </td>}
                  
              </tr>
            );
          })}
        </tbody>
      </table>
      {creator === username ? <p></p> : <Link to="/dashboard/customer/home" className="px-0">
        <button className="btn btn-lg btn-success">
          <i className="bi bi-plus-circle me-2"></i>Add order
        </button>
      </Link>}
      
    </div>
  );
};

export default CustomerOrder;
