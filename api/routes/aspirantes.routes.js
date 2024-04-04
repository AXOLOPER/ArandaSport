const express = require('express');
var md_auth = require('../middleware/authenticated');
const Controller = require("../controllers/aspirantes.controller");

const api = express.Router();

    // Ruta de Registro
        api.post("/", md_auth.ensureAuth, Controller.create);
    
    // Ruta de Registro
    api.post("/PDF",md_auth.ensureAuth,Controller.sendPDF);

    // Ruta de Consulta inicial
    api.get("/",md_auth.ensureAuth,Controller.readAll);

    // Ruta de Consulta particular
    api.get("/:id",md_auth.ensureAuth,Controller.read1);

    // Ruta de Actualizar
    api.put("/",md_auth.ensureAuth,Controller.update);
  
    // Ruta de Eliminar
    api.delete("/:id",md_auth.ensureAuth,Controller.del);

module.exports = api;