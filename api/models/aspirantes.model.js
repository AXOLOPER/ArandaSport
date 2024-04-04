const mongoose = require('mongoose');

const aspirantesSchema = new mongoose.Schema({
  CURP: { type: String, required: true, unique:true},
  CANDIDATO: { type: mongoose.Types.ObjectId, required: true, ref: "Candidatos"},
  CARRERA: { type: mongoose.Types.ObjectId, required: true, ref:"Carrera" },
  GRADO: { type: mongoose.Types.ObjectId, required: true, ref:"Grado" },
  GRUPO: { type: mongoose.Types.ObjectId, required: true, ref:"Grupo" },
  TURNO: { type: mongoose.Types.ObjectId, required: true, ref:"Turno" },
  PERIODO: { type: mongoose.Types.ObjectId, required: true, ref:"Periodo" },
  PLANTEL: { type: mongoose.Types.ObjectId, ref:"Plantel" },
  Status: { type: Boolean, default: true },
},{timestamps:true});

const Aspirantes = mongoose.model('Aspirantes', aspirantesSchema);

module.exports = Aspirantes;