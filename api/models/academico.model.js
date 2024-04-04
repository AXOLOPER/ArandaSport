const mongoose = require('mongoose');

const nivelSchema = new mongoose.Schema({
  _id:{type:mongoose.Types.ObjectId,auto:true},
  Nombre:{type:String},
  Status:{type:Boolean,default:true}
});

const entidadFederativaSchema = new mongoose.Schema({
  _id:{type:mongoose.Types.ObjectId,auto:true},
  Nombre:{type:String},
  Abrebiacion:{type:String},
  Status:{type:Boolean,default:true}
});

const divisionSchema = new mongoose.Schema({
  _id:{type:mongoose.Types.ObjectId,auto:true},
  Nombre:{type:String},
  Status:{type:Boolean,default:true}
});

const Nivel = mongoose.model('Nivel', nivelSchema);
const EntidadFederativa = mongoose.model('EntidadFederativa', entidadFederativaSchema);
const Division = mongoose.model('Division', divisionSchema);

module.exports = {
  Nivel,
  EntidadFederativa,
  Division
};