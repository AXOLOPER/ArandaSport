const mongoose = require('mongoose');

const candidatosSchema = new mongoose.Schema({
  ApellidoP: { type: String, required: true },
  ApellidoM: { type: String },
  Nombres: { type: String, required: true },
  CURP: { type: String, required: true, unique:true },
  FDia: { type: Number, required: true },
  FMes: { type: Number, required: true },
  FYear: { type: Number, required: true },
  FNac: { type: Date, required: true },
  LNac: { type: String, required: true },
  Domicilio: { type: String, required: true },
  CP: { type: Number, required: true },
  Municipio: { type: String, required: true },
  Colonia: { type: String},
  Estado: { type: String, required: true },
  Pais: { type: String, required: true },
  Cel: { type: String, required: true },
  Tel: { type: String },
  Email: { type: String, required: true },
  Sangre: { type: String, required: true },
  Sexo: { type: String, required: true },
  EstCivil: { type: String, required: true },
  Padece: { type: Boolean, default: false },
  Enfermedad: { type: String },
  Medicamento: { type: String },
  EmergenciaNombre: { type: String, required: true },
  EmergenciaParentesco: { type: String, required: true },
  EmergenciaTel: { type: String, required: true },
  Status: { type: Boolean, default: true },
});

const Candidatos = mongoose.model('Candidatos', candidatosSchema);

module.exports = Candidatos;