import express from "express";
import indexRoutes from "./routes/index.routes.js";
import contactsRoutes from "./routes/contacts.routes.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use("/contacts", contactsRoutes);

export default app;