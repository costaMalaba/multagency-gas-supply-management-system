import express from "express";
import multer from "multer";
import path from "path";
import { addGas, getAllGases, deleteGas, makePayment, getSingleGas, updateGas, getAllRetailerGases, getAllSalerGases, getSingleGasReta } from "../controllers/gas.js";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

router.post("/add", upload.single("image"), addGas);
router.route("/get/:id").get(getAllGases);
router.route("/get/single/:id").get(getSingleGas);
router.route("/get/single/retailer/:id").get(getSingleGasReta);
router.route("/get").get(getAllGases);
router.route("/saler/get").get(getAllSalerGases);
router.route("/retailer/get").get(getAllRetailerGases);
router.route("/update/:id").put(updateGas);
router.route("/delete/:id").delete(deleteGas);
router.route("/pay").post(makePayment);

export default router;