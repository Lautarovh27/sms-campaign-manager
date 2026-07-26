import app from "./app.js";
import sequelize from "./config/database.js";
import "./models/Contact.js";
import "./models/User.js";
import "./models/Campaign.js"

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión a MySQL establecida.");
        await sequelize.sync();
        console.log("✅ Modelos sincronizados con la base de datos.");

        app.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al conectar con MySQL:");
        console.error(error.message);
    }
};

startServer();