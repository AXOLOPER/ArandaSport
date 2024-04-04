const mongoose = require('mongoose');

const periodoSchema = new mongoose.Schema({
  Clave:{type:String,unique: true,index:true},
  Nombre:{type:String},
  Abreviatura:{type:String,unique: true},
  Status:{type:Boolean, default:true},
  FechaInicio:{type:Date},
  FechaFin: {type:Date},
});

const Periodo = mongoose.model('Periodo', periodoSchema);

module.exports = {
  Periodo
};