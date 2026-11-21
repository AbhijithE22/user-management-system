import express from "express";
import {
  loadAddUser,
  loadDashboard,
  LoadEditUser,
  loadLogin,
  Login,
  logout,
  deleteUser,
  updateUser,
  addUser
} from "../controllers/adminController.js";

import { isAdminGuest, isAdminLogin } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", isAdminGuest, loadLogin);
router.get("/login", isAdminGuest, loadLogin);

router.post("/login", Login);

router.get("/dashboard", isAdminLogin, loadDashboard);

router.get("/add-user", isAdminLogin, loadAddUser);

router.get("/edit-user/:id", isAdminLogin, LoadEditUser);

router.get("/logout", isAdminLogin, logout);
router.get("/delete-user/:id",deleteUser)
router.post("/edit-user/:id", isAdminLogin, updateUser);
router.post("/add-user", isAdminLogin, addUser);

export default router;
