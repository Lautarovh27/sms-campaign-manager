export const errorHandler = (err, req, res, next) => {

    console.error(err);

    // Nuestros errores
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    // Errores de Sequelize
    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
            error: "Ya existe un contacto con ese email."
        });
    }

    // Error inesperado
    return res.status(500).json({
        error: "Error interno del servidor."
    });

};