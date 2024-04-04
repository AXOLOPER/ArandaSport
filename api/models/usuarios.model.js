const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Usuario: { type: String, required: true },
  Secret: { type: String, required: true },
  estado: { type: Boolean, required: true, default:true },
  Rol: { type: String, required: true },
  privilegios: {
    adminT:{ type:Boolean },
    admin:{
      usuariosT:{ type:Boolean },
      usuarios:{
        create:{ type:Boolean },
        read:{ type:Boolean },
        update:{ type:Boolean },
        delete:{ type:Boolean }
      },
      bitacoraT:{ type:Boolean },
      bitacora:{
        read:{ type:Boolean },
      }
    },
    controlescolarT:{ type:Boolean },
    controlescolar:{
      alumnosT:{ type:Boolean },
      alumnos:{
        create:{ type:Boolean },
        read:{ type:Boolean },
        update:{ type:Boolean },
        delete:{ type:Boolean }
      },
      prospectosT:{ type:Boolean },
      prospectos:{
        create:{ type:Boolean },
        read:{ type:Boolean },
        update:{ type:Boolean },
        delete:{ type:Boolean }
      },
      academicoT:{ type:Boolean },
      academico:{
        create:{ type:Boolean },
        read:{ type:Boolean },
        update:{ type:Boolean },
        delete:{ type:Boolean }
      }
    }
  }
});

const Usuario = mongoose.model('Usuarios', usuariosSchema);

module.exports = Usuario;