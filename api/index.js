import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello Their")
})

app.listen(9000, (req, res) => {
    console.log("app listenin on port 9000!!");
})