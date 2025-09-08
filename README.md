# Práctica 2: Sistema de autenticación

Descripción: Diseña y desarrolla el backend de un sistema de autenticación el cual incluya Registro, Login, y Recuperación de contraseña, aplicando el patrón de desarrollo MVC y las buenas prácticas que se vieron hoy en clase.

Dependencias --> npm install
   - express: npm install express
   - uuid: npm install uuid

Rutas usadas
   - /registro (post): Permite registar un nuevo usuario
      --> { "name": "nombre", "email": "correo@correo.com", "password": "contraseña" }
   - /login (get): Permite la autenticacion de un usuario
      --> { "email": "correo@correo.com", "password": "contraseña" }
   - /recuperarContrasena (get): Genera un token para actualicar la contraseña
      --> { "email": "karen.reyes@correo.com" }
   - /resetPassword?token=<token> (post): Permite el ingreso de una nueva contraseña
      --> { "password": "ingresarNuevaContraseña" }