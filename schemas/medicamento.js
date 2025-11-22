import yup from 'yup'

export const medicamentoSchema = yup.object({
    nombre: yup.string().required("no se ingresó el nombre").max(100,"No puede superar los 100 caracteres"),
    categoria: yup.string().required("no se ingresó la categoría").max(100,"No puede superar los 100 caracteres"),
    dosis: yup.string().required("no se ingresó la dosis").max(100,"No puede superar los 100 caracteres"),
    frecuencia: yup.string().required("no se ingresó la frecuencia").max(100,"No puede superar los 100 caracteres"),
    nota: yup.string().nullable().max(255,"No puede superar los 255 caracteres"),
    imagen: yup.string().url().nullable(),
    link: yup.string().url().nullable()
})