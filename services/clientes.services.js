import { MongoClient, ObjectId } from "mongodb"
//instancia de Mongo
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.r8a3y5f.mongodb.net/")
// base de datos que nos conectamos
const db = client.db("AH20232CP1")

export async function getClientes(filtros = {}) {
    await client.connect();
    filtros.eliminado = { $ne: true };
    return db.collection("clientes").find(filtros).toArray();
}

export async function guardarCliente(cliente) {
    
    
}