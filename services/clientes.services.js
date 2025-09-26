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
export async function getClienteById(id) {
    await client.connect();
    return db.collection("clientes").findOne({ _id: new ObjectId(id) });
}


export async function guardarCliente(cliente) {
    await client.connect();
    const result = await db.collection("clientes").insertOne(cliente);
    return { ...cliente, _id: result.insertedId };//devuelve el cliente guardado con su id
}

export async function agregarMedicamentoACliente(clienteId, medicamentoId) {

    return db.collection("clientes").updateOne(
        { _id: new ObjectId(clienteId) },
        { $addToSet: { medicamentos: new ObjectId(medicamentoId) } }
    );
}

export async function eliminarClienteLogico(id) {
    return db.collection("clientes").updateOne(
        { _id: new ObjectId(id) }, {
        $set: { eliminado: true }
    })
}
