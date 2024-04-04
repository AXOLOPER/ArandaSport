const express = require('express');
const api = express.Router();
var md_auth = require('../middleware/authenticated');
const bitacoraController = require("../controllers/bitacora.controller");

// Ruta para consultar usuarios
api.get("/",md_auth.ensureAuth,bitacoraController.verAll);

module.exports = api;