import { readFile, writeFile } from "node:fs/promises"
import { MongoClient, ObjectId } from "mongodb";
//instancia de Mongo
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.r8a3y5f.mongodb.net/")
// base de datos que nos conectamos
const db = client.db("AH20232CP1")

export async function getMedicamentos(filtros = {}) {
    await client.connect();

    // Convertimos usuarioId a ObjectId si existe
    if (filtros.usuarioId) {
        try {
            filtros.usuarioId = new ObjectId(filtros.usuarioId);
        } catch (err) {
            console.error("Error convirtiendo usuarioId:", err);
        }
    }

    filtros.eliminado = { $ne: true };

    return db.collection("medicamentos").find(filtros).toArray();
}


export async function getMedicamentoById(id) {
    await client.connect();

    // Buscar el medicamento
    const medicamento = await db.collection("medicamentos")
        .findOne({ _id: new ObjectId(id) });

    if (!medicamento) return null;

    // Si no tiene colaboradores, devolverlo igual
    if (!medicamento.compartidoCon || medicamento.compartidoCon.length === 0) {
        medicamento.compartidoCon = [];
        return medicamento;
    }

    // Convertir IDs a ObjectId
    const compartidoIds = medicamento.compartidoCon.map(colabId => new ObjectId(colabId));

    // Buscar los usuarios correspondientes
    const usuarios = await db.collection("usuarios")
        .find({ _id: { $in: compartidoIds } })
        .project({ email: 1 })   // Podés agregar más campos
        .toArray();

    // Reemplazar los IDs por los documentos completos
    medicamento.compartidoCon = usuarios;

    return medicamento;
}
export async function getMedicamentosCompartidos(usuarioId) {
    await client.connect();

    const filtros = {
        compartidoCon: usuarioId, 
        eliminado: { $ne: true }
    };

    return db.collection("medicamentos").find(filtros).toArray();
}

export async function getMedicamentosByCategoria(categoria) {
    await client.connect()
    return db.collection("medicamentos").find({ categoria: categoria, eliminado: { $ne: true } }).toArray();

}


export async function getMedicamentosPorCliente(clienteId) {
    await client.connect()
        .then(() => {
            return db.collection("medicamentos")
                .find({ clientes: new ObjectId(clienteId) }).toArray();
        });
}


export async function guardarMedicamento(medicamento) {
    await client.connect();

    const resultado = await db.collection("medicamentos").insertOne(medicamento);

    return {
        ...medicamento,
        _id: resultado.insertedId
    };
}


export function editarMedicamento(medicamento, id) {
    return db
        .collection("medicamentos")
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: medicamento }
        );
}


export function eliminarMedicamento(id) {
    return db.collection("medicamentos").updateOne({ _id: new ObjectId(id) }, {
        $set: { eliminado: true }
    })
}

