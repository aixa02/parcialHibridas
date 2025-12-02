import { readFile, writeFile } from "node:fs/promises"
import { MongoClient, ObjectId } from "mongodb";
//instancia de Mongo
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.r8a3y5f.mongodb.net/")
// base de datos que nos conectamos
const db = client.db("AH20232CP1")

export async function getCategorias() {
    await client.connect();
    return db.collection("categorias").find().toArray();
}

export async function getCategoriaById(id) {
    await client.connect();
    return db.collection("categorias").findOne({ _id: new ObjectId(id) });
}

export async function guardarCategoria(categoria) {
    await client.connect();
    const resultado = await db.collection("categorias").insertOne(categoria);
    return { ...categoria, _id: resultado.insertedId };
}

export async function editarCategoria(id, categoria) {
    await client.connect();
    return db.collection("categorias").updateOne(
        { _id: new ObjectId(id) },
        { $set: categoria }
    );
}

export async function eliminarCategoria(id) {
    await client.connect();
    return db.collection("categorias").deleteOne({ _id: new ObjectId(id) });
}
