import users from "../databases/usersDatabase.js";
import tokens from "../databases/tokensDatabase.js";
import * as tokensController from "../controllers/tokensController.js";

//Método para listar todos los usuarios - Solo para TEST
function getAll(req, res) {
    res.json(tokens);
}

//Metodo para loguear a un usuario
function login(req, res) {
    const { email, password } = req.body;

    //Respuesta de estatus 400
    if (!email || !password) {
        return res.status(400).json({ Error: "Por favor ingrese su usario y contraseña para iniciar sesión." });
    } 

    //Determinar si el usuario existe
    const usuario = users.find(u => u.email === email && u.password === password);
    if (!usuario) {
        return res.status(404).json({ Error: "Usuario o contraseña inconrrectos." });
    }

    //Respuesta de estatus 200
    res.status(200).json({
        Mensaje: `¡Bienvenid@ ${usuario.name}, has iniciado sesión!`
    });
}

//Exportar métodos
export {
    getAll,
    login
};