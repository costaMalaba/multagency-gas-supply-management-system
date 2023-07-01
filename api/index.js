import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

import logIn from "./routes/auth.js";
import Register from "./routes/register.js";
import gas from "./routes/gas.js";
import order from "./routes/order.js";
import retailer from "./routes/retailer.js";

dotenv.config();
const app = express();



// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const PORT = process.env.PORT;

app.use("/auth", logIn);
app.use("/", Register);

// Retailer
app.use("/retailer", retailer);

// Gas
app.use("/gas", gas);

// Order
app.use("/order", order);

app.listen(PORT, (
    console.log(`App Listening on Port ${PORT}..`)
))