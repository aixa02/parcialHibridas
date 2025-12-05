import * as servicesMedicamento from "../services/medicamentos.services.js";

export async function verificarPropietarioMedicamento(req, res, next) {
    const id = req.params.id;
    const usuarioId = req.usuario._id.toString();

    try {
        const medicamento = await servicesMedicamento.getMedicamentoById(id);

        if (!medicamento)
            return res.status(404).json({ message: "Medicamento no encontrado" });

        const esPropietario = medicamento.usuarioId === usuarioId;
        const estaCompartido = medicamento.compartidoCon?.includes(usuarioId);

        if (!esPropietario && !estaCompartido) {
            return res.status(403).json({ message: "No tenés permiso para editar este medicamento" });
        }

        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error verificando permisos" });
    }
}
