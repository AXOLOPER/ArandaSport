const mongoose = require('mongoose');

const bitacoraSchema = new mongoose.Schema({
    usuario:{ type: String, ref:"Usuarios" },
    movimiento: { type: String, required: true },
}, { timestamps: true });

const Bitacora = mongoose.model('Bitacora', bitacoraSchema);

module.exports = Bitacora;