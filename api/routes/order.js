import express from "express";
import { addOrder, deleteOrder, getOrders } from "../controllers/order.js";

const router = express.Router();

router.route("/add").post(addOrder);
router.route("/get").get(getOrders);
router.route("/delete/:id").delete(deleteOrder);

export default router;