export const validateContact = (req, res, next) => {

    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            error: "El email no es válido"
        });
    }

    next();
};