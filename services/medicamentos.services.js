import { readFile, writeFile } from "node:fs/promises"
import { MongoClient, ObjectId } from "mongodb";
//instancia de Mongo
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.r8a3y5f.mongodb.net/")
// base de datos que nos conectamos
const db = client.db("AH20232CP1")

export async function getMedicamentos() {
    await client.connect()
    return db.collection("medicamentos").find().toArray()
    // console.log(medicamentos)
}

export async function getMedicamentoById(id) {
    await client.connect()
    return db.collection("medicamentos").findOne({ _id: new ObjectId(id) })
}

export async function getMedicamentosByCategoria(categoria) {
    await client.connect()
    return db.collection("medicamentos").find({ categoria }).toArray();
    
}