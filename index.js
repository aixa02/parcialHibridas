import express from "express"
import MedicamentosRoute from "./routes/medicamentos.route.js"
import MedicamentosApiRoute from "./api/routes/medicamentos.api.routes.js"
const app = express();
app.use(express.urlencoded({extended:true}));
app.use( express.json() )

app.use("/", MedicamentosRoute);

app.use("/api/medicamentos", MedicamentosApiRoute);
app.use(express.static('public'));


app.listen(3333 , () => {
    console.log("funcionando")
})