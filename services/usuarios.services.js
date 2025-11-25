import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//instancia de Mongo
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.r8a3y5f.mongodb.net/")
// base de datos que nos conectamos
const db = client.db("AH20232CP1")
const SECRET_KEY = "dwm4av"

export async function createUser(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error("No se pudo crear el usuario")

    const usuarioNuevo = { email: usuario.email, password: usuario.password }

    usuarioNuevo.password = await bcrypt.hash(usuario.password, 10)


    await db.collection("usuarios").insertOne(usuarioNuevo)
    return { ...usuario, password: undefined, confirmPassword: undefined }

}


export async function login(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!existe) throw new Error("Credenciales invalidas")
    const token = jwt.sign({ ...existe, password: undefined, confirmPassword: undefined }, SECRET_KEY, { expiresIn: "2h" })

    const esValido = await bcrypt.compare(usuario.password, existe.password)
    if (!esValido) throw new Error("Credenciales invalidas")
    return { ...existe, password: undefined, confirmPassword: undefined, token: token }

}