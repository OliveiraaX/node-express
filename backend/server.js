import express from "express";
import publicRoutes from "./routers/public.js";
import PrivateRoutes from "./routers/private.js";
import auth from "../middlewares/auth.js";
//import { PrivateResultType } from "@prisma/client/runtime/library";

const app = express();
app.use(express.json());
app.use("/", publicRoutes);
app.use("/", auth, PrivateRoutes);

app.listen(3001, () => console.log("Servidor iniciado na porta 3001..."));

// Middleware para analisar JSON
app.use(express.json()); // Garantir que req.body seja lido corretamente
