import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken"

//instancia de Mongo
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.r8a3y5f.mongodb.net/")
// base de datos que nos conectamos
const db = client.db("AH20232CP1")
const SECRET_KEY = "dwm4av"
const tokens = db.collection("tokens")

export async function crearToken(usuario) {
    await client.connect();

    const token = jwt.sign(
        { _id: usuario._id.toString(), email: usuario.email, rol: usuario.rol },
        SECRET_KEY,
        { expiresIn: "2h" }
    );

    await tokens.updateOne(
        { usuario_id: usuario._id },
        { $set: { token: token, usuario_id: usuario._id } },
        { upsert: true }
    );

    return token;
}


export async function validateToken(token) {
    try {
        // Normalizamos token por si viene con "Bearer ..." o comillas
        const cleanToken = token.replace(/"/g, "").replace("Bearer ", "").trim();

        const payload = jwt.verify(cleanToken, SECRET_KEY);

        const usuarioDb = await db.collection("usuarios")
            .findOne({ _id: new ObjectId(payload._id) });

        if (!usuarioDb) throw new Error("Usuario no encontrado");

        return usuarioDb;

    } catch (error) {
        console.error("Error validando token:", error);
        throw new Error("Token invalido");
    }
}
