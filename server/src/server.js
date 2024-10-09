import express from "express";
import cors from "cors";

//* - Importacion de Rutas :
import Mercado_Pago from "./router/Mercado_Pago_Router.js";

const server = express();

//*- Proxy - Midleware
server.use(express.json());
server.use(cors());
server.use("/Mercado_Pago", Mercado_Pago);

export default server;