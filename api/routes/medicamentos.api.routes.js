import express from "express"
import * as controllers from "../controllers/medicamentos.api.controllers.js"
import { validateMedicamento } from "../../middleware/medicamento.validate.js"

const route = express.Router()
//compass: https://www.mongodb.com/try/download/compass
route.get("/", controllers.getMedicamentos)

route.get("/:id", controllers.getMedicamentoById)
route.post("/", [validateMedicamento], controllers.createMedicamento)
route.delete("/:id", controllers.deleteMedicamento)
route.put("/:id", [validateMedicamento], controllers.updateMedicamento)


export default route