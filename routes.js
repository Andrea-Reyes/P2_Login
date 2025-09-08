import express from "express";
import * as usersController from "./controllers/usersController.js";
import * as authController from "./controllers/authController.js";

const router = express.Router();

//Creacion de paths disponibles
router.get("/getAll", usersController.getAll);
router.post("/registro", usersController.create);
router.get("/login", authController.login);
router.get("/recuperarContrasena", authController.forgotPass);

//Exportacion de este archivo
export default router;