const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  Nombre:{type:String},
  Abreviatura:{type:String},
  Status:{type:Boolean, default:true},
});

const Turno = mongoose.model('Turno', turnoSchema);

module.exports = {
  Turno
};