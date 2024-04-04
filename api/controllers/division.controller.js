const {Division} = require('../models/academico.model');
const Modelo = Division;
const text = "la Division"
const BitacoraController = require("./bitacora.controller");

async function create(req, res) {
  try {
    const nuevo = new Modelo();
    nuevo.Nombre=req.body.Nombre;
    const saved = await nuevo.save();
  if(saved){
      BitacoraController.registrar("registro "+text+" "+saved.Nombre+" con id: "+saved.id, req.usuario.id);
    }
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error al guardar '+text+':', error);
    res.status(500).json({ error: 'Ocurrió un error al guardar '+text });
  }
};

async function readAll  (req, res) {
  const all = await Modelo.find();
  return res.status(200).json(all);
}

async function read1(req, res){
  const { id } = req.params;
  const prospecto = await Modelo.findById(id);
  return res.status(200).json(prospecto);
}

async function update(req, res){
  try {
    const { _id } = req.body;
    const updated = await Modelo.findByIdAndUpdate(_id, req.body);
  if(updated){
      BitacoraController.registrar("actualizo "+text+" "+updated.Nombre+" con id: "+updated._id,req.usuario.id);
    }
    res.status(201).json(updated);
  } catch (error) {
    console.error('Error al guardar '+text+':', error);
    res.status(500).json({ error: 'Ocurrió un error al guardar '+text });
  }
}

async function del(req, res){
  try {
    const { _id } = req.body;
    let consul = await Modelo.findById(_id);
    let accion = consul.Status?"elimino":"restauro";
    const deleted = await Modelo.findByIdAndUpdate(_id,{Status:!consul.Status});
  if(deleted){
      BitacoraController.registrar(accion+" "+text+" "+deleted.Nombre+" con id: "+deleted._id,req.usuario.id);
    }
    res.status(201).json(deleted);
  } catch (error) {
    console.error('Error al '+accion+" "+text+':', error);
    res.status(500).json({ error: 'Ocurrió un error al '+accion+" "+text });
  }
}

module.exports={
  create,
  readAll,
  read1,
  update,
  del
}