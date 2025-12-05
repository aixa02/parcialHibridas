import * as servicesCliente from "../../services/clientes.services.js"
import * as servicesMedicamento from "../../services/medicamentos.services.js"

export function getMedicamentos(req, res) {
    const filtros = {}; // si no hay filtros, devuelve todo

    if (req.query.categoria) {
        filtros.categoria = req.query.categoria;
    }

    if (req.query.nombre) {
        filtros.nombre = {
            $regex: req.query.nombre,
            $options: "i" // insensible a mayúsculas
        };
    }

    servicesMedicamento.getMedicamentos(filtros)
        .then(medicamentos => {
            if (medicamentos.length === 0) {
                return res.status(200).json({
                    message: "No se encontraron medicamentos con los filtros aplicados",
                    data: []
                });
            }
            res.status(200).json(medicamentos);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "error interno del servidor" });
        });
}

export function getMedicamentoById(req, res) {
    const id = req.params.id
    servicesMedicamento.getMedicamentoById(id)
        .then(medicamento => res.status(200).json(medicamento))
        .catch(err => res.status(500).json({ message: "error interno del servidor" }));
}

export async function getMedicamentosByCategoria(req, res) {
    const categoria = req.params.categoria;
    try {
        const medicamentos = await services.getMedicamentosByCategoria(categoria);
        res.status(200).json(medicamentos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener medicamentos por categoría" });
    }
}

export function createMedicamento(req, res) {
    //recibimos los datos del body de la request y armamos un objeto
    const imagenFinal = req.body.imagen && req.body.imagen.trim() !== ""
        ? req.body.imagen
        : "/imagenes/medicamentos/placeholder.jpg";
    const medicamento = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        dosis: req.body.dosis,
        frecuencia: req.body.frecuencia,
        nota: req.body.nota || "",
        imagen: imagenFinal,
        link: req.body.link,
        usuarioId: req.usuario._id
    };
    // const clienteId = req.params.id;
    console.log("Usuario en createMedicamento:", req.usuario);

    servicesMedicamento.guardarMedicamento(medicamento)
        .then(medicamentoGuardado => res.status(201).json(medicamentoGuardado))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "No se guardó el medicamento", error: err.message });
        });
}

export function updateMedicamento(req, res) {
    const id = req.params.id;

    // Objeto dinámico: solo los campos que vienen definidos
    const medicamento = {};

    const campos = ["nombre", "categoria", "dosis", "frecuencia", "nota", "imagen", "link"];
    campos.forEach(campo => {
        if (req.body[campo] !== undefined && req.body[campo] !== "") {
            medicamento[campo] = req.body[campo];
        }
    });

    // Importante: si tu modelo usa usuarioId, hay que conservarlo
    medicamento.usuarioId = req.usuario._id;

    servicesMedicamento.editarMedicamento(medicamento, id)
        .then(() => res.status(200).json({ _id: id }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "No se pudo editar." });
        });
}


export async function deleteMedicamento(req, res) {
    const id = req.params.id;
    try {
        const medicamento = await servicesMedicamento.getMedicamentoById(id);
        if (!medicamento) return res.status(404).json({ message: "Medicamento no encontrado" });

        if (medicamento.usuarioId !== req.usuario._id.toString()) {
            return res.status(403).json({ message: "No tenés permisos para eliminar este medicamento" });
        }

        await servicesMedicamento.eliminarMedicamento(id);
        res.status(200).json({ message: `El medicamento con id: ${id} se eliminó correctamente` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al eliminar el medicamento" });
    }
}

export function addClienteAMedicamento(req, res) {
    const medicamentoId = req.params;
    const clienteId = req.body;
    servicesMedicamento.agregarClienteAMedicamento(medicamentoId, clienteId)
        .then(() => res.status(200).json({ message: "Cliente agregado al medicamento" }))
        .catch(() => res.status(500).json({ message: "Error al agregar cliente" }));

}
export async function compartirMedicamento(req, res) {
    const medicamentoId = req.params.id;
    const usuarioACompartir = req.body.usuarioId;

    try {
        const medicamento = await servicesMedicamento.getMedicamentoById(medicamentoId);

        if (!medicamento) {
            return res.status(404).json({ message: "Medicamento no encontrado" });
        }

        // Solo el propietario puede compartir
        if (medicamento.usuarioId !== req.usuario._id.toString()) {
            return res.status(403).json({ message: "Solo el creador puede compartir el medicamento" });
        }

        // Inicializa compartidoCon si no existe
        if (!medicamento.compartidoCon) {
            medicamento.compartidoCon = [];
        }

        // Evitar duplicados
        if (!medicamento.compartidoCon.includes(usuarioACompartir)) {
            medicamento.compartidoCon.push(usuarioACompartir);
        }

        await servicesMedicamento.editarMedicamento(medicamento, medicamentoId);

        res.status(200).json({ message: "Medicamento compartido correctamente" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al compartir medicamento" });
    }
}
export async function dejarDeCompartir(req, res) {
    const medicamentoId = req.params.id;
    const usuarioId = req.params.usuarioId;

    try {
        const medicamento = await servicesMedicamento.getMedicamentoById(medicamentoId);

        if (!medicamento) return res.status(404).json({ message: "Medicamento no encontrado" });

        if (medicamento.usuarioId !== req.usuario._id.toString()) {
            return res.status(403).json({ message: "Solo el creador puede modificar los permisos" });
        }

        medicamento.compartidoCon = medicamento.compartidoCon.filter(u => u !== usuarioId);

        await servicesMedicamento.editarMedicamento(medicamento, medicamentoId);

        res.status(200).json({ message: "Usuario eliminado del acceso" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al actualizar permisos" });
    }
}

