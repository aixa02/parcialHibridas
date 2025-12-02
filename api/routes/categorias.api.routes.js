import express from "express";
import * as controllers from "../controllers/categorias.api.controllers.js";
import { rolAdmin } from "../../middleware/rolAdmin.validate.js";
import { validateToken } from "../../middleware/token.validate.js";

const route = express.Router();

// Obtener categorías (cualquier usuario logueado)
route.get("/", [validateToken], controllers.getCategorias);

// Crear categoría (solo admin)
route.post("/", [validateToken, rolAdmin], controllers.createCategoria);

export default route;
