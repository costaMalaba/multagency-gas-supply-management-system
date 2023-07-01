import con from "../db/database.js";

export const Register = (req, res) => {
  const q =
    "SELECT * FROM retailer r, wholesaler w, customer c WHERE r.username=? OR w.username=? OR c.username=? LIMIT 1";
  const q2 =
    "INSERT INTO retailer (`id`, `name`, `phn_numb`, `email`, `username`, `password`, `role`) VALUES (?)";
  const q3 =
    "INSERT INTO wholesaler (`id`, `name`, `phn_numb`, `email`, `username`, `password`, `role`) VALUES (?)";
  const q4 =
    "INSERT INTO customer (`id`, `name` , `phn_numb`, `email`, `username`, `password`, `role`) VALUES (?)";
  const { id, name, phone_no, email, username, password, role } = req.body;
  const values = [id, name, phone_no, email, username, password, role];

  if (role === "1") {
    con.query(q, [username, username, username], (err, result) => {
      if (err) {
        return res.json({
          Status: "Error",
          Message: "Error In Query!!",
          Result: err,
        });
      } else if (result.length === 1) {
        return res.json({
          Status: "Found",
          Message: `Username: ${username} Already Exist!!`,
          Result: result,
        });
      } else {
        con.query(q2, [values], (err, result) => {
          if (err) {
            return res.json({
              Status: "Error",
              Message: "Error In Query!! r",
              Result: err,
            });
          } else {
            return res.status(201).json({
              Status: "Success",
              Message: "Registered Successfully!!",
              Result: result,
            });
          }
        });
      }
    });
  } else if (role === "0") {
    con.query(q, [username, username, username], (err, result) => {
      if (err) {
        return res.json({
          Status: "Error",
          Message: "Error In Query!!",
          Result: err,
        });
      } else if (result.length === 1) {
        return res.json({
          Status: "Found",
          Message: `Username: ${username} Already Exist!!`,
          Result: result,
        });
      } else {
        con.query(q3, [values], (err, result) => {
          if (err) {
            return res.json({
              Status: "Error",
              Message: "Error In Query!! w",
              Result: err,
            });
          } else {
            return res.status(201).json({
              Status: "Success",
              Message: "Registered Successfully!!",
              Result: result,
            });
          }
        });
      }
    });
  } else {
    con.query(q, [username, username, username], (err, result) => {
      if (err) {
        return res.json({
          Status: "Error",
          Message: "Error In Query!!",
          Result: err,
        });
      } else if (result.length === 1) {
        return res.json({
          Status: "Found",
          Message: `Username: ${username} Already Exist!!`,
          Result: result,
        });
      } else {
        con.query(q4, [values], (err, result) => {
          if (err) {
            return res.json({
              Status: "Error",
              Message: "Error In Query!! c",
              Result: err,
            });
          } else {
            return res.status(201).json({
              Status: "Success",
              Message: "Registered Successfully!!",
              Result: result,
            });
          }
        });
      }
    });
  }
};
