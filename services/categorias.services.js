import { client, db } from "../db.js"; // asumimos que ya tenés client/db

export async function getCategorias() {
    await client.connect();
    return await db.collection("categorias").find().toArray();
}

export async function guardarCategoria(categoria) {
    await client.connect();
    const resultado = await db.collection("categorias").insertOne(categoria);
    return {
        ...categoria,
        _id: resultado.insertedId
    };
}

export async function getCategoriaById(id) {
    await client.connect();
    return await db.collection("categorias").findOne({ _id: new ObjectId(id) });
}
