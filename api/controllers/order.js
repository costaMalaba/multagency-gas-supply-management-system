import con from "../db/database.js";
import sendSMS from "../services/sendSMS.js";
import sendMail from "../services/sendEmail.js";

export const addOrder = (req, res) => {
    const q = "INSERT INTO gas_order (`order_id`, `customer_username`, `retailer_username`, `gas_id`, `quantity`, `total_price`) VALUES (?)";
    const { order_id, customer_username, retailer_username, gas_id, quantity, price, phone_no, email } = req.body;
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
            return res.status(500).json({ Status: "Fail", Message: err, Result: err });
        } else {
            // Send SMS to Retailer
          const options = {
            to: [`+${phone_no}`],
            message: `Habari, ${retailer_username} \nMteja ${customer_username}, ametuma oda ya gas ${quantity} \nThamani ya oda: ${price} \nAsante...`,
          };

        //   sendSMS(options);

          // Send Email to Retailer
          const text = `Habari, ${retailer_username} \nMteja ${customer_username}, ametuma oda ya gas ${quantity} \nThamani ya oda: ${price} \nAsante...`;
          const subject = "MAG SUPPLY - OMBI LA UNUNUZI";

          sendMail(email, text, subject);
            return res.status(201).json({ Status: "Success", Message: "Order placed successfully", Result: result });
        }
    })
}

export const getOrders = (req, res) => {
    const username = req.query.term;
    const role = req.query.term1;
    const q = 'SELECT * FROM gas_order JOIN gas ON gas_order.gas_id = gas.id WHERE gas_order.customer_username=? ORDER BY gas_order.updated_at';
    const q1 = 'SELECT * FROM gas_order JOIN gas ON gas_order.gas_id = gas.id WHERE gas_order.retailer_username=? ORDER BY gas_order.updated_at';
    const q2 = 'SELECT * FROM gas_order JOIN gas ON gas_order.gas_id = gas.id WHERE gas_order.customer_username=? AND gas.role=? ORDER BY gas_order.updated_at';

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
        }else if (role === "0") {
            con.query(q2, [username, role], (err, result) => {
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