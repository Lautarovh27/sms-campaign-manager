import app from "./app.js";
import sequelize from "./config/database.js";
import "./models/User.js";
import "./models/index.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        
        await sequelize.sync({
            alter: true
        });
        

        app.listen(PORT, () => {
            
        });

    } catch (error) {
        console.error("Error al conectar con MySQL:");
        console.error(error.message);
    }
};

startServer();