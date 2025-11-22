import * as services from "../../services/usuarios.services.js"

export function createUser(req, res) {
    services.createUser(req.body)
        .then(usuario => res.status(201).json(usuario))
        .catch(err => res.status(500).json(err))
}

export function login(req, res) {

}