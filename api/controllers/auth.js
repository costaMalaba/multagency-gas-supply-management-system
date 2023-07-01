import con from "../db/database.js";

export const logIn = (req, res) => {
  const q1 = "SELECT * FROM wholesaler WHERE username = ? AND password = ? AND role = ? LIMIT 1";
  const q2 = "SELECT * FROM retailer WHERE username = ? AND password = ? AND role = ? LIMIT 1";
  const q3 = "SELECT * FROM customer WHERE username = ? AND password = ? AND role = ? LIMIT 1";

  const { username, password, role }  = req.body;
  if (role === '0') {
    con.query(q1, [username, password, role], (err, result) => {
      if(err) {
        return res.status(500).json({Status: "Error", Message: "Error In Query!!", Result: err});
      } else {
        if (result.length === 1) {
          return res.status(200).json({Status: "W_Success", Message: "Logged in successfully", Result: result});
        } else {
          return res.status(404).json({Status: "Error", Message: `User  with Name: ${username} Not Found!!`, Result: result});
        }
      }
    })
  } else if (role === '1') {
    con.query(q2, [username, password, role], (err, result) => {
      if(err) {
        return res.status(500).json({Status: "Error", Message: "Error In Query!!", Result: err});
      } else {
        if (result.length === 1) {
          return res.status(200).json({Status: "R_Success", Message: "Logged in successfully", Result: result});
        } else {
          return res.status(404).json({Status: "Error", Message: `User  with Name: ${username} Not Found!!`, Result: result});
        }
      }
    })
  } else {
    con.query(q3, [username, password, role], (err, result) => {
      if(err) {
        return res.status(500).json({Status: "Error", Message: "Error In Query!!", Result: err});
      } else {
        if (result.length === 1) {
          return res.status(200).json({Status: "C_Success", Message: "Logged in successfully", Result: result });
        } else {
          return res.status(404).json({Status: "Error", Message: `User  with Name: ${username} Not Found!!`, Result: result});
        }
      }
    })
  }
};

export const logOut = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).json({Satus: "Success", Message: "Logged out successfully"});
};
