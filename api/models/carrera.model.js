const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
  Clave:{type:String,unique: true,index:true},
  Nivel:{ type:mongoose.Types.ObjectId,ref:"Nivel"},
  EntidadFederativa:{type:mongoose.Types.ObjectId,ref:"EntidadFederativa"},
  Division:{type:mongoose.Types.ObjectId,ref:"Division"},
  Nombre:{type:String},
  Abreviatura:{type:String,unique: true},
  Status:{type:Boolean, default:true}
});

const Carrera = mongoose.model('Carrera', carreraSchema);

module.exports = {
  Carrera
};