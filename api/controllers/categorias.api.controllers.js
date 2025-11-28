import * as servicesCategorias from "../../services/categorias.services.js";

export function getCategorias(req, res) {
    servicesCategorias.getCategorias()
        .then(categorias => res.status(200).json(categorias))
        .catch(() => res.status(500).json({ message: "Error al obtener las categorías" }));
}

export function createCategoria(req, res) {
    const categoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion || ""
    };

    servicesCategorias.guardarCategoria(categoria)
        .then(c => res.status(201).json(c))
        .catch(() => res.status(500).json({ message: "No se pudo guardar la categoría" }));
}
