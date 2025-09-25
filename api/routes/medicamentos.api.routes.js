import express from "express"
import * as controllers from "../controllers/medicamentos.api.controllers.js"

const route = express.Router()
//compass: https://www.mongodb.com/try/download/compass
route.get( "/", controllers.getMedicamentos )

route.get( "/:id", controllers.getMedicamentoById )
route.post( "/:id", controllers.createMedicamento )
route.delete("/:id", controllers.deleteMedicamento)
route.put( "/:id", controllers.updateMedicamento)


export default route