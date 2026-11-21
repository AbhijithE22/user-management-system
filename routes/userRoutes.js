import express from "express";
import {
  loadHome,
  loadLogin,
  loadSignup,
  signup,
  login,
  logout,
} from "../controllers/userController.js";
import { isLogin, isGuest } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isGuest, loadLogin);
router.get("/login", isGuest, loadLogin);
router.get("/signup", isGuest, loadSignup);
router.get("/home", isLogin, loadHome);
router.get("/logout", logout);

router.post("/signup", signup);
router.post("/login", login);


export default router;
