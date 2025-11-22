import express from "express"
import * as controllers from "../controllers/usuarios.api.controllers.js"
import { validateUser } from "../../middleware/usuario.validate.js"

const route = express.Router()
route.post("/",[validateUser], controllers.createUser)
route.post("/login", controllers.login)

export default route