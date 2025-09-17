import express from "express"
import MedicamentosRoute from "./routes/medicamentos.route.js"
//import ProductosApiRoute from "./api/routes/productos.api.routes.js"
const app = express()
app.use(express.urlencoded({extended:true}))

app.use("/medicamentos", MedicamentosRoute)
//app.use("/api/productos", ProductosApiRoute)



app.listen(3333 , () => {
    console.log("funcionando")
})