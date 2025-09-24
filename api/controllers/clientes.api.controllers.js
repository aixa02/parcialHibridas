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
            return servicesMedicamento.getMedicamentos({
                clientes: new ObjectId(clienteId) //new ObjectId(clienteId) convierte el clienteId en un ObjectId válido
            })
                .then(medicamentos => {
                    res.status(200).json({ cliente, medicamentos });
                });
        })
        .catch(err => {
            res.status(500).json({ message: "Error interno", error: err.message })});

}



export function createCliente(req, res) {
    const { nombre, imagen, descripcion, medicamentoId } = req.body;
    const cliente = { nombre, imagen, descripcion };

    servicesCliente.guardarCliente(cliente)
        .then(clienteGuardado => {
            if (medicamentoId) {
                return servicesMedicamento.agregarClienteAMedicamento(medicamentoId, clienteGuardado._id)
                    .then(() => clienteGuardado); 
            }
            return clienteGuardado;
        })

        .then(clienteGuardado => res.status(201).json(clienteGuardado))
        .catch(err => res.status(500).json({ message: "No se guardó el cliente", error: err.message }));
}
