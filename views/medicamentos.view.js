import { createPage } from "../pages/utils.js"

export function createMedicamentosPage(medicamentos) {

  let html = `
        <div class="container mt-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h1 class="h3">Mis Medicamentos</h1>
                <a href="/medicamento/nuevo" class="btn btn-success">➕ Nuevo medicamento</a>
            </div>

            <div class="row g-4">
    `;

  medicamentos.forEach(medicamento => {
    html += `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                    <img src="${medicamento.imagen}" class="card-img-top w-50" alt="${medicamento.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title">${medicamento.nombre}</h3>
                        <p class="card-text"><strong>Categoría:</strong> ${medicamento.categoria}</p>
                        <p class="card-text"><em>${medicamento.nota}</em></p>
                        <div class="mt-auto">
                            <a href="/medicamentos/${medicamento._id}" class="btn btn-outline-primary btn-sm me-2">Ver detalle</a>
                            <a href="/productos/editar/${medicamento._id}" class="btn btn-warning btn-sm me-2">Editar</a>
                            <a href="/productos/borrar/${medicamento._id}" class="btn btn-danger btn-sm">Eliminar</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });

  html += `
            </div>
        </div>
    `;

  return createPage("Medicamentos", html);
}

export function createMedicamentoDetail(medicamento) {
  let html = `
        <div class="container mt-4">
            <div class="card shadow">
                <img src="${medicamento.imagen}" class="card-img-top" alt="${medicamento.nombre}">
                <div class="card-body">
                    <h2 class="card-title">${medicamento.nombre}</h2>
                    <p class="card-text"><strong>Categoría:</strong> ${medicamento.categoria}</p>
                    <p class="card-text"><em>${medicamento.nota}</em></p>
                    <a href="${medicamento.link}" target="_blank" class="btn btn-primary">
                        Más información
                    </a>
                    <div class="mt-3">
                        <a href="/productos/editar/${medicamento._id}" class="btn btn-warning me-2">Editar</a>
                        <a href="/productos/borrar/${medicamento._id}" class="btn btn-danger">Eliminar</a>
                    </div>
                </div>
            </div>
        </div>
    `;

  return createPage(`Detalle - ${medicamento.nombre}`, html);
}