import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import contactsRoutes from "./routes/contacts.routes.js";
import {errorHandler} from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(indexRoutes);
app.use("/contacts", contactsRoutes);
app.use(errorHandler);

export default app;