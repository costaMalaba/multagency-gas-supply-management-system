import Categories from "../customer/Categories";
import mpesa from "../images/payment/m-pesa.png";

const SetPayment = () => {
  console.log(Categories);
  return (
    <div className="conatiner p-5">
      {Categories.map((category) => {
        return (
          <li key={category.id}>
            <div className="row g-3">
              <div className="col-3"></div>
              <div className="card shadow-lg bg-light col text-center">
                <div className="card-img-top">
                  <img src={mpesa} alt="Not found" className="rounded-circle"></img>
                  <p className="ms-auto fw-bold fs-2">LIPA NAMBA - {category.lipa_namba}</p>
                </div>
                <div className="card-body fs-2 text-muted tetx-nfo">{category.title}</div>
              </div>
              <div className="col-3"></div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default SetPayment;
