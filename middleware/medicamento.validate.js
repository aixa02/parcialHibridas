import { medicamentoSchema } from "../schemas/medicamento.js"

export function validateMedicamento(req, res, next) {
    console.log("req.usuario:", req.usuario);
    console.log("req.body antes de validar:", req.body);

    if (!req.usuario?._id) {
        return res.status(401).json({ message: "Usuario no autenticado" });
    }

    // agregamos usuarioId al body para que lo valide Yup
    req.body.usuarioId = req.usuario._id.toString();

    medicamentoSchema.validate(req.body, {
        abortEarly: false, 
        stripUnknown: true, 
    })
    .then(() => next())
    .catch((err) => res.status(400).json({ message: err }));
}