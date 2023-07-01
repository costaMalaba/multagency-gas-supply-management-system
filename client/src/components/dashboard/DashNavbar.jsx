// import PieChart from "./Pichart";
// import LineChart from "./Linechart";
// import { toast } from "react-toastify";
// import axios from "axios";

const DashNavbar = () => {
  // const handleInput = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8900/");
  //     console.log(res);
  //   } catch (error) {
  //     //toast.success("Error");
  //   }
  // }

  return (
    <div className="p-5 bg-light">
      <div className="container-fluid">
        <div className="row">
        <div className="col-12 col-sm-6 colmd-4 col-lg-3">
            <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
              <i className="bi bi-bag-check fs-1 text-info"></i>
              <div>
                <p className="fs-1">
                  <strong>Orders</strong>
                </p>
                <h2 className="text-center">14</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 colmd-4 col-lg-3">
            <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
              <i className="bi bi-people fs-1 text-info"></i>
              <div>
                <p className="fs-1">
                  <strong>Customers</strong>
                </p>
                <h2 className="text-center">59</h2>
              </div>
            </div>
          </div>

          {/* <div className="col-12 col-sm-6 colmd-4 col-lg-3">
            <div className="d-flex justify-content-around align-items-center p-3 bg-light rounded-3 border-secondary shadow-lg">
              <i className="bi bi-stopwatch fs-1 text-warning"></i>
              <div>
                <p className="fs-1">
                  <strong>Amount</strong>
                </p>
                <h2 className="text-center">24,000/=</h2>
              </div>
            </div>
          </div> */}
        </div>

        {/* <div className="row">
          <div className="col-12 col-md-8 p-3">
            <LineChart />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashNavbar;