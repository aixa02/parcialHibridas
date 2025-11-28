import express from "express";
import * as controllers from "../controllers/categorias.api.controllers.js";

const router = express.Router();


router.get("/", controllers.getCategorias);


export default router;
