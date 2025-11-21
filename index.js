import express from "express"
import MedicamentosRoute from "./routes/medicamentos.route.js"
import MedicamentosApiRoute from "./api/routes/medicamentos.api.routes.js"
import ClientesApiRoute from "./api/routes/clientes.api.routes.js"
import cors from "cors";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use( express.json() )
app.use(cors());
app.use("/", MedicamentosRoute);
app.use('/imagenes', express.static('imagenes'));
app.use("/api/medicamentos", MedicamentosApiRoute);
app.use("/api/clientes", ClientesApiRoute);
app.use(express.static('public'));


app.listen(3333 , () => {
    console.log("funcionando")
})