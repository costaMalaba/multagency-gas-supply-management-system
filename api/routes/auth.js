import express from 'express';
const router = express.Router();
import { logIn, logOut } from '../controllers/auth.js';

// router.post("/auth", logIn);
router.route("/login").post(logIn);

export default router;