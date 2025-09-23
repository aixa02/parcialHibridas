import * as services from "../../services/medicamentos.services.js"
export function getMedicamentos(req, res){
    services.getMedicamentos(req.query)
        .then( medicamentos => res.status(200).json(medicamentos) )
        .catch( err => res.status(500).json( {message: "error interno del servidor"} ) )
}
