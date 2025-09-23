export function createPage(titulo, contenido) {
    let html = ""

    html += '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    html += '<title>' + titulo + '</title>'
    html += '<h1 class="d-none">' + titulo + '</h1>'
    html += '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">'
    html += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">'
    html += '<link rel="stylesheet" href="https://use.typekit.net/nsd2zhy.css">'
    html += '</head><body>'


    html += '<nav class="navbar navbar-expand-lg fixed-top bg-light mb-5">'
    html += '   <div class="container-fluid">'
    html += '<a class="navbar-brand d-flex align-items-center" href="#">MistoMed</a>'
    html += '   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">'
    html += ' <span class="navbar-toggler-icon"></span>'
    html += '  </button>'
    html += '<div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">'

    html += '<ul class="navbar-nav mx-auto">'

    html += '<li class="nav-item">'
    html += '   <a class="nav-link active" aria-current="page" href="/">Medicamentos</a>'
    html += '  </li>'
    html += '   <li class="nav-item">'
    html += '  <a class="nav-link" href="/categoria/analgesico">Analgésicos</a>'
    html += '   </li>'
    html += '   <li class="nav-item">'
    html += '  <a class="nav-link" href="/categoria/antiinflamatorio">Antiinflamatorios</a>'
    html += '   </li>'
    html += '   </li>'
    html += '   <li class="nav-item">'
    html += '  <a class="nav-link" href="/categoria/antihipertensivo">Antihipertensivos</a>'
    html += '   </li>'
    html += '   <li class="nav-item">'
    html += '  <a class="nav-link" href="/categoria/anticonceptivo">Anticonceptivos</a>'
    html += '   </li></ul>'
    
    html += '  </div> </div></nav>'

    html += '<main class="mt-4 pt-4">'
    html += contenido
    html += '</main><footer>'
    //info de footer
    html += '</footer>'
    html += '<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>'
    html += '<script src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js" integrity = "sha384-G/EV+4j2dNv+tEPo3++6LCgdCROaejBqfUeNjuKAiuXbjrxilcCdDz6ZAVfHWe1Y" crossorigin = "anonymous" ></script>'
    html += '</body></html> '

    return html
}

export function createProductList(productos) {
    let html = "<ul>"
    productos.forEach(producto => {
        html += `<li>${producto.id} - ${producto.nombre} - ${producto.precio}</li>`
    })
    html += "</ul>"
    return html
}