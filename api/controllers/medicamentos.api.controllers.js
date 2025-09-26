import * as servicesCliente from "../../services/clientes.services.js"
import * as servicesMedicamento from "../../services/medicamentos.services.js"

export function getMedicamentos(req, res) {
    const filtros = {};//si no se aplica ningun filtro, devuelve todos los medicamentos

    if (req.query.categoria) filtros.categoria = req.query.categoria;
    if (req.query.nombre) filtros.nombre = req.query.nombre;

    servicesMedicamento.getMedicamentos(filtros)
        .then(medicamentos => res.status(200).json(medicamentos))
        .catch(err => res.status(500).json({ message: "error interno del servidor" }));
}

export function getMedicamentoById(req,res){
    const id= req.params.id
    servicesMedicamento.getMedicamentoById(id)
    .then(medicamento => res.status(200).json(medicamento))
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
    const clienteId = req.params.id;

    servicesMedicamento.guardarMedicamento(medicamento)
        .then(medicamentoGuardado => {
            if (clienteId) {
                return servicesCliente.agregarMedicamentoACliente(clienteId, medicamentoGuardado._id)
                    .then(() => medicamentoGuardado);
            }
            return medicamentoGuardado;
        })
        .then(medicamentoFinal => res.status(201).json(medicamentoFinal))
        .catch(err => res.status(500).json({ message: "No se guardó el medicamento", error: err.message }));
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

    servicesMedicamento.editarMedicamento(medicamento, id)
        .then(() => res.status(202).json({ _id: id }))
        .catch(err => res.status(500).json({ message: "No se pudo editar." }));
}

export function deleteMedicamento(req, res) {
    const id = req.params.id;
    servicesMedicamento.eliminarMedicamento(id)
        .then((id) => res.status(202).json({ message: `El medicamento con id: ${id} se eliminó correctamente` }))
        .catch(err => res.status(500).json({ message: "Error al eliminar el medicamento" }));
}

export function addClienteAMedicamento(req, res) {
    const medicamentoId = req.params;
    const clienteId = req.body;
    servicesMedicamento.agregarClienteAMedicamento(medicamentoId, clienteId)
        .then(() => res.status(200).json({ message: "Cliente agregado al medicamento" }))
        .catch(() => res.status(500).json({ message: "Error al agregar cliente" }));

}