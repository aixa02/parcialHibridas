import { categoriaSchema } from "../schemas/categorias.schema.js";

export function validateCategoria(req, res, next) {
    categoriaSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    })
    .then(() => next())
    .catch(err => res.status(400).json({ message: err }));
}
