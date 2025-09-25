import * as servicesCliente from "../../services/clientes.services.js"
import * as servicesMedicamento from "../../services/medicamentos.services.js"
import { ObjectId } from "mongodb"

export function getClientes(req, res) {
    servicesCliente.getClientes()
        .then(medicamentos => res.status(200).json(medicamentos))
        .catch(err => res.status(500).json({ message: "error interno del servidor" }));
}

export function getClienteById(req, res) {
    const id = req.params.id
    servicesCliente.getClienteById(id)
        .then(cliente => {
            if (cliente) {
                res.status(200).json(cliente)
            } else {
                res.status(404).json({ message: "Recurso no encontrado" })
            }
        })
        .catch(err => res.status(500).json({ message: "error interno del servidor" }))
}

export function getMedicamentosdeCliente(req, res) {

    const clienteId = req.params.id;

    servicesCliente.getClienteById(clienteId)
        .then(cliente => {
            if (!cliente) {
                return res.status(404).json({ message: "Cliente no encontrado" });
            }
            // si el cliente no tiene medicamentos
            if (!cliente.medicamentos || cliente.medicamentos.length === 0) {
                return res.status(200).json({ message: "No existen medicamentos guardados"});
            }
            // buscamos los medicamentos por los ids guardados en el cliente
            return servicesMedicamento.getMedicamentos({
                _id: { $in: cliente.medicamentos } 
            })
                .then(medicamentos => {
                    res.status(200).json({ cliente, medicamentos });
                });
        })
        .catch(err => {
            res.status(500).json({ message: "Error interno", error: err.message });
        });

}



export function createCliente(req, res) {
    const { nombre, imagen, descripcion, medicamentoId } = req.body;
    const cliente = { nombre, imagen, descripcion };

    servicesCliente.guardarCliente(cliente)
        .then(clienteGuardado => {
            if (medicamentoId) {
                return servicesMedicamento.agregarMedicamentoACliente( clienteGuardado._id, medicamentoId)
                    .then(() => clienteGuardado);
            }
            return clienteGuardado;
        })

        .then(clienteGuardado => res.status(201).json(clienteGuardado))
        .catch(err => res.status(500).json({ message: "No se guardó el cliente", error: err.message }));
}

export function addMedicamentoCliente(req, res) {
    const clienteId = req.params.id;
    const medicamentoId = req.body.medicamentoId;
    servicesCliente.agregarMedicamentoACliente(clienteId, medicamentoId)
        .then(() => res.status(200).json({
            message: `Medicamento ${medicamentoId} agregado al cliente ${clienteId}`
        })
        )
        .catch(err =>
            res.status(500).json({
                message: "No se pudo agregar el medicamento al cliente", error: err.message
            })
        );

}