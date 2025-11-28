import yup from 'yup'

export const medicamentoSchema = yup.object({
    nombre: yup.string().required("no se ingresó el nombre").max(100, "No puede superar los 100 caracteres"),
    categoria: yup.string().required("no se ingresó la categoría").max(100, "No puede superar los 100 caracteres"),
    dosis: yup.string().required("no se ingresó la dosis").max(100, "No puede superar los 100 caracteres"),
    frecuencia: yup.string().required("no se ingresó la frecuencia").max(100, "No puede superar los 100 caracteres"),
    nota: yup.string().nullable().max(255, "No puede superar los 255 caracteres"),
    imagen: yup.string()
        .test('is-url-or-relative', 'imagen must be a valid URL or relative path', value => {
            if (!value) return true; // permite null o vacío
            // acepta urls completas o rutas que empiezan con /
            return /^https?:\/\//.test(value) || value.startsWith('/');
        })
        .nullable(true),
    link: yup.string().url().nullable(),
     usuarioId: yup.string().required("El ID del usuario es obligatorio") 
})