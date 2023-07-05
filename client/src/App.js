import Login from "./components/Login";
import Dashboard from "./components/dashboard/RetailerDashboard";
import RegisterRetailer from "./components/retailer/RegisterRetailer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import DashNavbar from "./components/dashboard/DashNavbar";
import RetailerCategory from "./components/categories/RetailerCategory";
import ViewRetailerPublished from "./components/retailer/ViewRetailerPublished";
import StartOder from "./components/order/StartOrder";
import CustomerOrder from "./components/order/CustomerOrder";
import SetPayment from "./components/payment/SetPayment";
import SalerCategory from "./components/categories/SalerCategory";
import RetailerAddPublish from "./components/publish/RetailerAddPublish";
import SalerAddPublish from "./components/publish/SalerAddPublish";
import StartOderRe from "./components/order/StartOrderReta";
import PaymentDetails from "./components/payment/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "register",
    element: < RegisterRetailer/>
  },

  // Retailer
  {
    path: "/dashboard/retailer",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/retailer/home",
        element: <DashNavbar />
      },
      {
        path: "/dashboard/retailer/order/:id",
        element: <StartOderRe />
      },
      {
        path: "/dashboard/retailer/publish",
        element: <RetailerAddPublish />
      },
      {
        path: "/dashboard/retailer/publish/view/:id",
        element: <ViewRetailerPublished />
      },
      {
        path: "/dashboard/retailer/view/order",
        element: <CustomerOrder />
      },
      {
        path: "/dashboard/retailer/view/order/payment",
        element: <PaymentDetails />
      },
      {
        path: "/dashboard/retailer/view/order/sent/:id",
        element: <CustomerOrder />
      },
      {
        path: "/dashboard/retailer/start/order/:id",
        element: <SalerCategory />
      },
    ]
  },

  // Wholesaler
  {
    path: "/dashboard/saler",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/saler/home",
        element: <DashNavbar />
      },
      {
        path: "/dashboard/saler/publish",
        element: <SalerAddPublish />
      },
      {
        path: "/dashboard/saler/publish/view/:id",
        element: <ViewRetailerPublished />
      },
    ]
  },

  // Customer
  {
    path: "/dashboard/customer",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/customer/home",
        element: <RetailerCategory />
      },
      {
        path: "/dashboard/customer/order/:id",
        element: <StartOder />
      },
      {
        path: "/dashboard/customer/view/order",
        element: <CustomerOrder />
      },
      {
        path: "/dashboard/customer/view/order/pay",
        element: <SetPayment />
      },
    ]
  },
]);

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" theme="light" />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;