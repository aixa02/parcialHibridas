//import { console } from "node:inspector"
import * as service from "../services/medicamentos.services.js"
import * as view from "../views/medicamentos.view.js"

export function getMedicamentos(req, res) {
    service.getMedicamentos()
        .then((medicamentos) => res.send(view.createProductPage(medicamentos)))
}