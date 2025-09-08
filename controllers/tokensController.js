import { v4 as uuidv4 } from "uuid";
import users from "../databases/usersDatabase.js";
import tokens from "../databases/tokensDatabase.js";

//Método para generar un token y url
function generarToken(usuario){
    const nuevoToken = {
        usuario: usuario,
        token: uuidv4(),
        creacion: new Date(),
        expira: Math.floor(Date.now()/1000)+(60*60),
        status: "Active"
    }

    console.log(nuevoToken);
    tokens.push(nuevoToken);
    return {
        URL: `https://localhost:3000/resetPassword?token=${nuevoToken.token}`,
        Token: nuevoToken.token,
        Expira: new Date(nuevoToken.expira * 1000).toLocaleString()
    };
}

//Metodo para actualizar la contraseña y estatus del token
function update(tokenParam, newPassword) {
    //Determinar que el token exista y esté activo
    const token = tokens.find(t => t.token === tokenParam && t.status === "Active");
    if (!token) {
        return null;
    }

    const usuario = users.find(u => u.email === token.usuario);
    if (!usuario) {
        return null;
    }

    //Actualizar contraseña y estado de token
    usuario.password = newPassword;
    token.status = "Used";

    return usuario;
}

//Exportar métodos
export {
    generarToken,
    update
};