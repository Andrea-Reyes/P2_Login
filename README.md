# Práctica 2: Sistema de autenticación con registro, login y recuperación de contraseña.

Descripción: Diseña y desarrolla el backend de un sistema de autenticación el cual incluya Registro, Login, y Recuperación de contraseña, aplicando el patrón de desarrollo MVC y las buenas prácticas que se vieron hoy en clase.

Algoritmo de la recuperación de contraseña:
 - Solicitud de recuperación
 - El usuario ingresa su correo o nombre de usuario en el formulario de “Olvidé mi contraseña”.
 - El sistema valida que la cuenta exista.

Generación del token seguro
 - Se genera un token aleatorio, único y seguro (ej. 32+ bytes con HMAC, UUIDv4, crypto.randomBytes u otro).
 - Se asocia este token a la cuenta del usuario en la base de datos (array temporal de objetos llamado tokens ) junto con:
    - Hora de creación.
    - Tiempo de expiración (ej. 15–60 minutos).
    - Estado (activo/usado).

Envío del enlace de recuperación
 - Se envía un correo al usuario con un enlace del tipo: https://midominio.com/reset-password?token=<token>
 - Este enlace es el que usará el usuario para realizar un POST con la nueva contraseña

Validación del token
 - El usuario realiza un POST usando el link que se le retornó y enviando en el body un json con el parametro password el cual tendrá el valor de la nueva contraseña.
 - eje: {"password":"micontraseña"}
    - El sistema busca el token en la base de datos.
    - Verifica que exista, no esté expirado y no haya sido usado. Si pasa la verificación se procede a actualizarle la contraseña al usuario y el token lo marca como usado. 
 - Prueba: Al intentar realizar el login de nuevo debería de entrar con la nueva contraseña.