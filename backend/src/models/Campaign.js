import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Campaign = sequelize.define(
    "Campaign", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "draft"
        },
    },
    {
        tableName: "campaigns",
        timestamps: true
    }
);

export default Campaign;