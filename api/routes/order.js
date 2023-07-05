import express from "express";
import { addOrder, countOrders, deleteOrder, getOrders } from "../controllers/order.js";

const router = express.Router();

router.route("/add").post(addOrder);
router.route("/get").get(getOrders);
router.route("/delete/:id").delete(deleteOrder);
router.route("/count").get(countOrders);

export default router;