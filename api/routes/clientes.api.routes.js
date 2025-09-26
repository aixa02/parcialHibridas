import express from "express"
import * as controllers from "../controllers/clientes.api.controllers.js"

const route = express.Router()
//compass: https://www.mongodb.com/try/download/compass
route.get( "/", controllers.getClientes )
route.get( "/:id", controllers.getClienteById )
route.get( "/:id/medicamentos", controllers.getMedicamentosdeCliente )
route.post( "/", controllers.createCliente )
route.post( "/:id/medicamentos", controllers.addMedicamentoCliente )
route.delete("/:id", controllers.deleteCliente)
//route.put( "/:id", controllers.updateCliente)
//route.patch( "/:id", controllers.editarMedicamento )

export default route