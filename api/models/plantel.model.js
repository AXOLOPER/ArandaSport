const mongoose = require('mongoose');

const plantelSchema = new mongoose.Schema({
  Nombre:{type:String},
  Abreviatura:{type:String},
  Direccion:{type:String},
  Telefono:{type:String},
  Status:{type:Boolean, default:true},
});

const Plantel = mongoose.model('Plantel', plantelSchema);

module.exports = {
  Plantel
};