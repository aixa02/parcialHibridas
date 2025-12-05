import * as services from "../../services/usuarios.services.js"
import * as clienteServices from "../../services/clientes.services.js"

export function createUser(req, res) {

    // Agregamos rol por defecto sin alterar otros campos
    const datosUsuario = {
        ...req.body,
        rol: "user"
    };

    services.createUser(datosUsuario)
        .then(usuarioCreado => {
            // Ya no se crean clientes asociados
            res.status(201).json({
                usuario: usuarioCreado
            });
        })
        .catch(err => res.status(500).json(err));
}



export async function login(req, res) {
    try {
        // login devuelve usuario con password validado y token generado
        const usuario = await services.login(req.body);

        // buscamos el cliente asociado al usuario
        //const cliente = await clienteServices.getClienteById(usuario._id);

        res.status(200).json({
            usuario: {
                _id: usuario._id,
                email: usuario.email
            },
            // cliente: cliente ? { _id: cliente._id, nombre: cliente.nombre } : null,
            token: usuario.token
        });

    } catch (err) {
        console.error("Error login:", err);
        res.status(400).json({ error: err.message });
    }
}
export async function buscarUsuarios(req, res) {
    const { email } = req.query;

    if (!email) return res.json([]);

    try {
        const usuarios = await services.buscarUsuariosPorEmail(email);
        res.json(usuarios);
    } catch (err) {
        console.error("Error al buscar usuarios:", err);
        res.status(500).json({ error: "Error al buscar usuarios" });
    }
}