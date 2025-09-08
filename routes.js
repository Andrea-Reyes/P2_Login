import express from "express";
import * as usersController from "./controllers/usersController.js";

const router = express.Router();

//Creacion de paths disponibles
router.get("/getAll", usersController.getAll);
router.post("/registro", usersController.create);

//Exportacion de este archivo
export default router;