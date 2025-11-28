import * as services from "../../services/usuarios.services.js"
import * as clienteServices from "../../services/clientes.services.js"

export function createUser(req, res) {
    services.createUser(req.body)
        .then(async usuarioCreado => {

            const clienteData = {
                usuario_id: usuarioCreado._id,
                nombre: "",
                imagen: "",
                descripcion: "",
                medicamentos: []
            };

            const clienteCreado = await clienteServices.guardarCliente(clienteData);

            res.status(201).json({
                usuario: usuarioCreado,
                cliente: clienteCreado
            });
        })
        .catch(err => res.status(500).json(err));
}


export async function login(req, res) {
    try {
        // login devuelve usuario con password validado y token generado
        const usuario = await services.login(req.body);

        // buscamos el cliente asociado al usuario
        const cliente = await clienteServices.getClienteById(usuario._id);

        res.status(200).json({
            usuario: {
                _id: usuario._id,
                email: usuario.email
            },
            cliente: cliente ? { _id: cliente._id, nombre: cliente.nombre } : null,
            token: usuario.token
        });

    } catch (err) {
        console.error("Error login:", err);
        res.status(400).json({ error: err.message });
    }
}
