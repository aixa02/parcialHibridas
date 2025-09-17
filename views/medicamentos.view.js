import { createPage } from "../pages/utils.js"

export function createProductPage(medicamentos) {
    let html = "<a href='/medicamento/nuevo' >Nuevo medicamento</a>"
    html += "<ul>"
    medicamentos.forEach(medicamento => {
        html += `<li>${medicamento.id} - ${medicamento.nombre} 
            <a href="/productos/${medicamento.id}" >Ver</a>
            <a href="/productos/editar/${medicamento.id}" >Editar</a>
            <a href="/productos/borrar/${medicamento.id}" >Eliminar</a>
        </li>`
    })
    html += "</ul>"
    return createPage("Medicamentos", html)
}
