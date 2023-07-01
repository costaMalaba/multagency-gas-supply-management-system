import express from 'express';
const router = express.Router();
import { Register } from '../controllers/register.js';

// router.post("/auth", logIn);
router.route("/register").post(Register);

export default router;