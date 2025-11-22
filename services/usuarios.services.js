import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt"

//instancia de Mongo
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.r8a3y5f.mongodb.net/")
// base de datos que nos conectamos
const db = client.db("AH20232CP1")

export async function createUser(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error("No se pudo crear el usuario")

    const usuarioNuevo = { ...usuario, confirmPassword: undefined }
    usuarioNuevo.password = await bcrypt.hash(usuario.password, 10)


    await db.collection("usuarios").insertOne(usuarioNuevo)
    return { ...usuario, password: undefined, confirmPassword: undefined }

}