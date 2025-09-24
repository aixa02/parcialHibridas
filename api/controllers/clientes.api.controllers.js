import * as services from "../../services/clientes.services.js"

export function getClientes(req,res){
    services.getClientes()
        .then(medicamentos => res.status(200).json(medicamentos))
        .catch(err => res.status(500).json({ message: "error interno del servidor" }));
}

export function createCliente(req,res){
    const cliente = {
        nombre: req.body.nombre,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion

    };
    services.guardarCliente(cliente)
        .then(clienteGuardado => res.status(201).json(clienteGuardado))
        .catch(err => res.status(500).json({ message: "No se guardó el cliente" }));
}