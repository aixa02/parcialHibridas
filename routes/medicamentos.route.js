import express from "express"
import * as controller from "../controllers/medicamentos.controllers.js"

const route = express.Router()
route.get("/", controller.getMedicamentos)
route.get("/medicamentos/:id", controller.getMedicamentoById)

route.get("/categoria/:categoria", controller.getMedicamentosByCategoria)




export default route