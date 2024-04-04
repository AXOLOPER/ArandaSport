const Bitacora = require("../models/bitacora.model");

async function verAll(req,res){
    if(!req.usuario.privilegios.admin.bitacora.read){
        return res.status(401).json({ message: "No tiene permiso para realizar esa operacion!" });
    }
    const allBitacora = await Bitacora.find().populate('usuario');
    return res.status(200).json(allBitacora);
}

async function registrar(movimiento,usuario){
    const bitacora = new Bitacora();
    bitacora.usuario = usuario;
    bitacora.movimiento = movimiento;
    bitacora.save();
}

module.exports = {
    verAll,
    registrar
}