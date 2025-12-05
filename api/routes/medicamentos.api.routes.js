import express from "express"
import * as controllers from "../controllers/medicamentos.api.controllers.js"
import { validateMedicamento } from "../../middleware/medicamento.validate.js"
import { verificarPropietarioMedicamento } from "../../middleware/verificarPropietarioMedicamento.js"
import { compartirMedicamento, dejarDeCompartir } from "../controllers/medicamentos.api.controllers.js";
import { validateToken } from "../../middleware/token.validate.js"

const route = express.Router()
//compass: https://www.mongodb.com/try/download/compass
route.get("/", [validateToken], controllers.getMedicamentos)

route.get("/categoria/:categoria", [validateToken], controllers.getMedicamentosByCategoria);
route.get("/:id", controllers.getMedicamentoById)
route.post("/", [validateToken, validateMedicamento], controllers.createMedicamento);

route.put("/:id", [validateToken, verificarPropietarioMedicamento], controllers.updateMedicamento);
//route.put("/:id", [validateToken, verificarPropietarioMedicamento, validateMedicamento], controllers.updateMedicamento);

route.delete("/:id", [validateToken, verificarPropietarioMedicamento], controllers.deleteMedicamento);

route.post("/:id/compartir", [validateToken], compartirMedicamento);

route.delete("/:id/compartir/:usuarioId", [validateToken], dejarDeCompartir);
route.put("/:id", [validateToken, verificarPropietarioMedicamento], controllers.updateMedicamento);
route.delete("/:id", [validateToken, verificarPropietarioMedicamento], controllers.deleteMedicamento);


export default route