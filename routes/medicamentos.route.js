import express from "express"
import * as controller from "../controllers/medicamentos.controllers.js"

const route = express.Router()
route.get("/", controller.getMedicamentos)

export default route