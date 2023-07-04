import con from "../db/database.js";
import sendSMS from "../services/sendSMS/sendSMS.js";

export const addOrder = (req, res) => {
    const q = "INSERT INTO gas_order (`order_id`, `customer_username`, `retailer_username`, `gas_id`, `quantity`, `total_price`) VALUES (?)";
    const { order_id, customer_username, retailer_username, gas_id, quantity, price } = req.body;
    const values = [
        order_id,
        customer_username,
        retailer_username,
        gas_id,
        quantity,
        price,
    ]

    con.query(q, [values], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ Status: "Fail", Message: err });
        } else {
            // sendSMS();
            return res.status(201).json({ Status: "Success", Message: "Your order placed successfully", Result: result });
        }
    })
}

export const getOrders = (req, res) => {
    const username = req.query.term;
    const q = 'SELECT * FROM gas_order JOIN gas ON gas_order.gas_id = gas.id WHERE gas_order.customer_username=? ORDER BY gas_order.updated_at';
    const q1 = 'SELECT * FROM gas_order JOIN gas ON gas_order.gas_id = gas.id WHERE gas_order.retailer_username=? ORDER BY gas_order.updated_at';

    con.query(q1, [username], (err, result) => {
        if(err) {
            return res.status(500).json({ Status: "Fail", Message: "Error in Query!!", Result: err });
        } else if (result.length === 0) {
            con.query(q, [username], (err, result) => {
                if (err) {
                    return res.status(500).json({ Status: "Fail", Message: "Error in Query!!", Result: err });
                } else {
                    return res.status(200).json({ Status: "Success", Result: result });
                }
            })
        }else {
            return res.status(200).json({ Status: "Success", Result: result });
        }
    })
}

export const deleteOrder = (req, res) => {
    const id = req.params.id;
    console.log(id)
    const q = "DELETE FROM gas_order WHERE order_id = ?";
  
    con.query(q, [id], (err, result) => {
      if (err) return res.json({ Error: "Error in Querying", Result: err });
      return res.json({
        Status: "Success",
        Message: "Order Deleted Successfully!!",
        Result: result,
      });
    });
  };