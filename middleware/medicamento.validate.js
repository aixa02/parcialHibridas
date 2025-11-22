import { medicamentoSchema } from "../schemas/medicamento.js"

export function validateMedicamento(req, res, next) {
    console.log("validando")
    medicamentoSchema.validate(req.body, {
        abortEarly: false, //se detiene en el primer error
        stripUnknown:true, //elimina los campos que no esten definidos en el schema
    })
        .then(() => next())
        .catch((err) => res.status(400).json({ message: err }))

}