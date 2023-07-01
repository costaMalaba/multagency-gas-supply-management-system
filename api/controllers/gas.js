import con from "../db/database.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const makePayment = async (req, res) => {
  try {
    // Extract required parameters from the request body
    const { tx_ref, amount, email, currency, phonenumber, name } = req.body;

    // Make API call to Flutterwave to initialize the payment
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref,
        amount,
        currency,
        customer: {
          email,
          phonenumber,
          name,
        },
        currency,
        redirect_url: "http://localhost:3000/dashboard/customer/home",
        // Include any other required parameters
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
        json: {
          redirect_url: "http://localhost:3000/dashboard/customer/home",
          meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
          },
          customizations: {
            title: "Pied Piper Payments",
            logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
          },
        },
      }
    );

    // Retrieve the payment URL from the Flutterwave response
    const paymentUrl = response.data.data.link;

    // Return the payment URL as the response
    res.json({ paymentUrl });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Error initiating payment", Mesaage: err });
  }
};

export const addGas = (req, res) => {
  // const q1 ="SELECT * FROM gas WHERE name = ? LIMIT 1"
  const q =
    "INSERT INTO gas (`id`, `brand`, `branch`, `weight`, `price`, `quantity_remain`, `phone_no`, `description`, `image`, `creator`, `role`) VALUES (?)";
  const {
    gas_id,
    brand,
    branch,
    weight,
    price,
    quantity,
    phone_no,
    description,
    creator,
    role,
  } = req.body;

  const filename = req.file.filename;

  const values = [ gas_id, brand, branch, weight, price, quantity, phone_no, description, filename, creator, role ];
  con.query(q, [values], (err, result) => {
    if (err) {
      return res.json({
        Status: "Error",
        Message: "Error In Query!!",
        Result: err,
      });
    } else {
      return res.status(201).json({
        Status: "Success",
        Message: "Gas Published Successfully!!",
        Result: result,
      });
    }
  });
};

export const getAllGases = (req, res) => {
  const q = `SELECT *, TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS time_taken FROM gas WHERE creator=?`;
  const { id } = req.params;

  con.query(q, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Status: "Error", Message: "Error In Querying!!", Result: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: result });
    }
  });
};

export const getAllRetailerGases = (req, res) => {
  const q = `SELECT *, g.id as gas_id, TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS time_taken FROM gas g, retailer r WHERE g.role=r.role AND g.role='1' AND r.role='1'`;

  con.query(q, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Status: "Error", Message: "Error In Querying!!", Result: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: result });
    }
  });
};


export const getAllSalerGases = (req, res) => {
  const q = `SELECT *, g.id as gas_id, TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS time_taken FROM gas g JOIN wholesaler w ON g.role=w.role WHERE g.role='0'`;

  con.query(q, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Status: "Error", Message: "Error In Querying!!", Result: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: result });
    }
  });
};

export const getSingleGas = (req, res) => {
  const q = `SELECT *, TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS time_taken FROM gas WHERE id = ?`;
  const { id } = req.params;

  con.query(q, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Status: "Error", Message: "Error In Querying!!", Result: err });
    } else {
      return res.status(200).json({ Status: "Success", Result: result });
    }
  });
};

export const updateGas = (req, res) => {
  const { id, currentRemainedGas } = req.body;
  const q = `UPDATE gas SET quantity_remain=? WHERE  id=?`;

  con.query(q, [currentRemainedGas, id], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: "Fail", Message: err });
    } else {
      return res.status(200).json({ Status: "Success", Message: result });
    }
  })
}

export const deleteGas = (req, res) => {
  const q1 = "SELECT * FROM gas WHERE id = ? LIMIT 1";
  const q2 = "DELETE FROM gas WHERE id = ?";
  const { id } = req.params;

  con.query(q1, [id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Message: "Error In Query!!" });
    } else {
      if (result.length === 0) {
        return res.status(404).json({
          Status: "Error",
          Message: `Gas with ID: ${id} Not Found`,
          Result: result,
        });
      } else {
        con.query(q2, [id], (err, result) => {
          if (err) {
            return res.json({ Status: "Error", Message: "Error In Query!!" });
          } else {
            return res.status(200).json({
              Status: "Success",
              Message: "Deleted Successfully!!",
              Result: result,
            });
          }
        });
      }
    }
  });
};
