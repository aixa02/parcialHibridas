import { readFile, writeFile } from "node:fs/promises"
import { MongoClient, ObjectId } from "mongodb";
//instancia de Mongo
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.r8a3y5f.mongodb.net/")
// base de datos que nos conectamos
const db = client.db("AH20232CP1")

export async function getMedicamentos(filtros = {}) {
    await client.connect();
    filtros.eliminado = { $ne: true };
    return db.collection("medicamentos").find(filtros).toArray();
}


export async function getMedicamentoById(id) {
    await client.connect()
    return db.collection("medicamentos").findOne({ _id: new ObjectId(id) })
}

export async function getMedicamentosByCategoria(categoria) {
    await client.connect()
    return db.collection("medicamentos").find({ categoria: categoria, eliminado: { $ne: true } }).toArray();

}

export async function guardarMedicamento(medicamento) {
    await client.connect()
    return db.collection("medicamentos").insertOne(medicamento)
}

export function editarMedicamento(medicamento, id) {
    return db.collection("medicamentos").replaceOne({ _id: new ObjectId(id) }, medicamento)
}

export function eliminarMedicamento(id) {
    return db.collection("medicamentos").updateOne({ _id: new ObjectId(id) }, {
        $set: { eliminado: true }
    })
}