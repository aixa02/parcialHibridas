import yup from 'yup'

export const usuarioSchema = yup.object({
    email: yup.string().email().required("Debe ingresar un email"),
    password: yup.string().required("Debe ingresar una contraseña")
        .matches(/[0-9]/, "La contraseña debe tener al menos un número")
        .matches(/[A-Z]/, "La contraseña debe tener una mayúscula"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Las contraseñas deben coincidir").required("Debe confirmar la contraseñas"),

})

export const usuarioLogin = yup.object({
    email: yup.string().email().required("Debe ingresar un email"),
    password: yup.string().required("Debe ingresar una contraseña")
})