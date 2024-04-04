const mongoose = require('mongoose');

const grupoSchema = new mongoose.Schema({
  Nombre:{type:String},
  Status:{type:Boolean, default:true},
});

const Grupo = mongoose.model('Grupo', grupoSchema);

module.exports = {
  Grupo
};