import express from "express"
import MedicamentosRoute from "./routes/medicamentos.route.js"
//import ProductosApiRoute from "./api/routes/productos.api.routes.js"
const app = express();
app.use(express.urlencoded({extended:true}));

app.use("/", MedicamentosRoute);
//app.use("/api/productos", ProductosApiRoute)
app.use(express.static('public'));


app.listen(3333 , () => {
    console.log("funcionando")
})