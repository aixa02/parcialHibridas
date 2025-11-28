import yup from "yup";

export const categoriaSchema = yup.object({
    nombre: yup.string()
        .required("El nombre de la categoría es obligatorio")
        .max(100, "No puede superar los 100 caracteres"),
    descripcion: yup.string()
        .nullable()
        .max(255, "No puede superar los 255 caracteres")
});
