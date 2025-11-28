import { MongoClient } from "mongodb";

// instancia de Mongo
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.r8a3y5f.mongodb.net/");

// base de datos
const dbName = "AH20232CP1";

const categoriasPorDefecto = [
    { nombre: "Antibióticos" },
    { nombre: "Analgesicos" },
    { nombre: "Vitaminas" },
    { nombre: "Antiinflamatorios" },
    { nombre: "Anticonceptivos" },
    { nombre: "Gastrointestinales" },
    { nombre: "Antivirales" },
    { nombre: "Antidepresivos" },
    { nombre: "Laxantes" },
    { nombre: "Ansiolíticos" },
  

];

async function seedCategorias() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB");

        const db = client.db(dbName);
        const categoriasCollection = db.collection("categorias");

        await categoriasCollection.deleteMany({});

        await categoriasCollection.insertMany(categoriasPorDefecto);

        console.log("Categorías insertadas correctamente");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

seedCategorias();
