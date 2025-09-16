import express from "express"
import ProductosRoute from "./routes/productos.route.js"
import ProductosApiRoute from "./api/routes/productos.api.routes.js"
const app = express()
//app.use(express.urlencoded({extended:true}))

//app.use("/productos", ProductosRoute)
//app.use("/api/productos", ProductosApiRoute)



app.listen(3333 , () => {
    console.log("funcionando")
})