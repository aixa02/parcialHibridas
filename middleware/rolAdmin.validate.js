export function rolAdmin(req, res, next) {
    try {
        if (!req.usuario) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        if (req.usuario.rol !== "admin") {
            return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: "Error en verificación de rol" });
    }
}
