import * as services from "../../services/categorias.services.js";

export function getCategorias(req, res) {
    services.getCategorias()
        .then(cats => res.status(200).json(cats))
        .catch(() => res.status(500).json({ message: "Error al obtener categorías" }));
}

export function getCategoriaById(req, res) {
    services.getCategoriaById(req.params.id)
        .then(cat => {
            if (!cat) return res.status(404).json({ message: "Categoría no encontrada" });
            res.status(200).json(cat);
        })
        .catch(() => res.status(500).json({ message: "Error al obtener la categoría" }));
}

export function createCategoria(req, res) {
    const categoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion || ""
    };

    services.guardarCategoria(categoria)
        .then(c => res.status(201).json(c))
        .catch(() => res.status(500).json({ message: "Error al guardar categoría" }));
}

export function updateCategoria(req, res) {
    const categoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    };

    services.editarCategoria(req.params.id, categoria)
        .then(() => res.status(200).json({ message: "Categoría actualizada" }))
        .catch(() => res.status(500).json({ message: "Error al editar categoría" }));
}

export function deleteCategoria(req, res) {
    services.eliminarCategoria(req.params.id)
        .then(() => res.status(200).json({ message: "Categoría eliminada" }))
        .catch(() => res.status(500).json({ message: "Error al eliminar categoría" }));
}
