const express = require('express');
var md_auth = require('../middleware/authenticated');
const Controller = require("../controllers/candidatos.controller");

const api = express.Router();

    // Ruta de Registro
    api.post("/", md_auth.ensureAuth, Controller.create);
    
    // Ruta de Inscripcion
    api.post("/inscripcion",Controller.Inscripcion);
    
    // Ruta de Inscripcion
    api.post("/CURP/:CURP",Controller.readCURP);
    
    // Ruta de HTML->PDF
    api.get("/pdf/:CURP", Controller.Acuerdo);
    
    // Ruta de PDF->Print
    api.get("/pdfs/:CURP",Controller.Print);

    // Ruta de Consulta inicial
    api.get("/",md_auth.ensureAuth,Controller.readAll);

    // Ruta de Consulta particular
    api.get("/:id",md_auth.ensureAuth,Controller.read1);

    // Ruta de Actualizar
    api.put("/",md_auth.ensureAuth,Controller.update);
  
    // Ruta de Eliminar
    api.delete("/:id",md_auth.ensureAuth,Controller.del);

module.exports = api;