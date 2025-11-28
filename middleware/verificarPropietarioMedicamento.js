import * as servicesMedicamento from "../services/medicamentos.services.js";
export async function verificarPropietarioMedicamento(req, res, next) {
    const id = req.params.id;
    const medicamento = await servicesMedicamento.getMedicamentoById(id);

    if (!medicamento) return res.status(404).json({ message: "Medicamento no encontrado" });

    if (medicamento.usuarioId !== req.usuario._id) {
        return res.status(403).json({ message: "No tenés permisos para modificar este medicamento" });
    }

    next();
}
