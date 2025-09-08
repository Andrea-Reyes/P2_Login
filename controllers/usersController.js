import { v4 as uuidv4 } from "uuid";
import users from "../databases/usersDatabase.js";

//Método para listar todos los usuarios - Solo para TEST
function getAll(req, res) {
    res.json(users);
}

//Metodo para registrar un nuevo usuario
function create (req,res){
    const body = req.body;

    //Definiendo los datos para registrar un usuario
    const nuevoUsuario = {
        id: uuidv4(),
        name: body.name,
        email: body.email,
        password: body.password
    }

    //Respuesta de estatus 400
    if (!body.email || !body.password) {
        return res.status(400).json({ Error: "Por favor complete todos los campos para registrarse." });
    } 
    
    //Respuesta de estatus 200
    users.push(nuevoUsuario);
    return res.status(200).json({ 
        Status: `¡${nuevoUsuario.name}, tu usuario ha sido registrado con exito!`
    });
}

export {
    getAll, 
    create
};