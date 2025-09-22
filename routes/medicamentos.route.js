import express from "express"
import * as controller from "../controllers/medicamentos.controllers.js"

const route = express.Router()
route.get("/", controller.getMedicamentos)
route.get("/medicamentos/:id", controller.getMedicamentoById)

//route.get("/analgesicos", controller.getCategoria)




export default route