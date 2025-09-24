import * as services from "../../services/medicamentos.services.js"

export function getMedicamentos(req, res) {
    const filtros = {};//si no se aplica ningun filtro, devuelve todos los medicamentos

    if (req.query.categoria) filtros.categoria = req.query.categoria;
    if (req.query.nombre) filtros.nombre = req.query.nombre;

    services.getMedicamentos(filtros)
        .then(medicamentos => res.status(200).json(medicamentos))
        .catch(err => res.status(500).json({ message: "error interno del servidor" }));
}

export function createMedicamento(req, res) {
    //recibimos los datos del body de la request y armamos un objeto
    const medicamento = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        dosis: req.body.dosis,
        frecuencia: req.body.frecuencia,
        nota: req.body.nota,
        imagen: req.body.imagen,
        link: req.body.link

    };
    services.guardarMedicamento(medicamento)
        .then(medicamentoGuardado => res.status(201).json(medicamentoGuardado))
        .catch(err => res.status(500).json({ message: "No se guardó el medicamento" }));
}

export function updateMedicamento(req, res) {

    const id = req.params.id;
    
    const medicamento = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        dosis: req.body.dosis,
        frecuencia: req.body.frecuencia,
        nota: req.body.nota,
        imagen: req.body.imagen,
        link: req.body.link

    };

    services.editarMedicamento(medicamento, id)
        .then(() => res.status(202).json({ _id: id }))
        .catch(err => res.status(500).json({ message: "No se pudo editar." }));
}

export function deleteMedicamento(req, res) {
    const id = req.params.id;
    services.eliminarMedicamento(id)
        .then((id) => res.status(202).json({ message: `El medicamento con id: ${id} se eliminó correctamente` }))
        .catch(err => res.status(500).json({ message: "Error al eliminar el medicamento" }));
}