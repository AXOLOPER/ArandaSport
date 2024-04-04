const express = require('express');
const api = express.Router();
var md_auth = require('../middleware/authenticated');
const usuarioController = require("../controllers/usuarios.controller");


// Ruta de registro
api.post("/",md_auth.ensureAuth,usuarioController.registrar);

// Ruta para consultar usuarios
api.get("/",md_auth.ensureAuth,usuarioController.verAll);

// Consulta de usuario por id
api.get("/:id",md_auth.ensureAuth,usuarioController.ver1);

// Ruta para actualiza usuarios
api.put("/",md_auth.ensureAuth,usuarioController.editar);

// Ruta para poner a los uusarios com activos e inactivos
api.delete("/delete/:id",md_auth.ensureAuth,usuarioController.eliminar);

module.exports = api;