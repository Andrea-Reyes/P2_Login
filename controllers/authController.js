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

//Metodo para loguear a un usuario
function forgotPass(req, res) {
    const { email } = req.body;

    //Respuesta de estatus 400
    if (!email) {
        return res.status(400).json({ Error: "Por favor ingrese su coreo." });
    } 

    //Determinar si el usuario existe
    const usuario = users.find(u => u.email === email);
    if (!usuario) {
        return res.status(404).json({ Error: "El correo ingresado no está registrado o es incorrecto." });
    }

    //Respuesta de estatus 200
    const tokenData = tokensController.generarToken(usuario.email);
    return res.status(200).json({ 
        Mensaje: `${usuario.name}, se ha generado un token para actualizar tu contraseña.`,
        URL: tokenData.URL,
        Token: tokenData.Token,
        Expira: tokenData.Expira
    });
}

//Método para actualizar la contraseña
function newPass(req, res){
    const { password } = req.body;
    const tokenParam = req.query.token;

    //Respuesta de estatus 400
    if (!password) {
        return res.status(400).json({ Error: "Por favor ingrese su contraseña." });
    } 

    //Respuesta de estatus 404
    const nuevaContrasena = tokensController.update(tokenParam, password);
    if (!nuevaContrasena) {
        return res.status(404).json({ Error: "El token ingresado es inconrrecto o ya ha expirado." });
    }

    //Respuesta de estatus 200
    const correo = tokens.find(t => t.token === tokenParam);
    return res.status(200).json({ 
        Mensaje: `¡La contraseña asociada al correo: ${correo.usuario}, ha sido actualizada con exito!`
    });
}

//Exportar métodos
export {
    getAll,
    login,
    forgotPass,
    newPass
};