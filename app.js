import express from "express";
import router from "./routes.js";

//Para ejecutar el framework
const app = express();
app.use(express.json());
app.use(router);

//Configurar el puerto escuchador
app.listen(
    3000, 
    ()=>{
        console.log('Servidor funcionando');
    }
)