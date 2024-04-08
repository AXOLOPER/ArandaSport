// @/main.js
const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
var cors = require('cors');
const aspirantesRoute = require('./routes/aspirantes.routes');
const candidatosRoute = require('./routes/candidatos.routes');
const usuariosRoute = require('./routes/usuarios.routes');
const bitacoraRoute = require('./routes/bitacora.routes');
const carrerasRoute = require('./routes/carreras.routes');
const nivelesRoute = require('./routes/niveles.routes');
const entidadesFederativasRoute = require('./routes/entidadesFederativas.routes');
const divisionesRoute = require('./routes/division.routes');
const periodoRoute = require('./routes/periodo.routes');
const gradoRoute = require('./routes/grado.routes');
const grupoRoute = require('./routes/grupo.routes');
const turnoRoute = require('./routes/turno.routes');
const plantelRoute = require('./routes/plantel.routes');

const Usuario = require('./models/usuarios.model');
const { PORT, DBLINK, API, HOST, APIHOST } = require("./config");
const path = require('path');

var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let api = API||"";

app.get(api+"/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});

app.use(api+'/usuarios',usuariosRoute);
app.use(api+'/bitacora',bitacoraRoute);
app.use(api+'/candidatos',candidatosRoute);
app.use(api+'/aspirantes',aspirantesRoute);
app.use(api+'/carreras',carrerasRoute);
app.use(api+'/niveles',nivelesRoute);
app.use(api+'/entidadesFederativas',entidadesFederativasRoute);
app.use(api+'/divisiones',divisionesRoute);
app.use(api+'/periodos',periodoRoute);
app.use(api+'/grados',gradoRoute);
app.use(api+'/grupos',grupoRoute);
app.use(api+'/turnos',turnoRoute);
app.use(api+'/planteles',plantelRoute);

// The secret should be an unguessable long string (you can use a password generator for this!)
const JWT_SECRET ="goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

// Ruta de login
app.post(api+"/authenticate",async (req, res) => {
  const usuario  = req.body.Usuario;
  const secret  = req.body.Secret;
  console.log(`${usuario} is trying to login ...`);

  const U = await Usuario.findOne({Usuario:usuario, estado:true});
  if(!U){
    return res
    .status(401)
    .json({ message: "The username and password your provided are invalid" });
  }

  const valid = await bcrypt.compare(secret,U.Secret);
  if(!valid){
    return res.status(401)
    .json({ 
      message: "The username and password your provided are invalid"
    });
  }
    
  console.log(`${usuario} has loggedin successfully ..`);
  return res.status(200).json({
    token: jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 * 10),data:{ user: U.Usuario, privilegios:U.privilegios, id:U._id }}, JWT_SECRET),
    message: `${usuario} has loggedin successfully ..`
  });
});


// Ruta de login
app.get(api + "/logo/:logo", async (req, res) => {
  
  var fs = require('fs');
  const { logo } = req.params;
  const FILEPATH = path.join(__dirname, "/logos/", logo);
  if (fs.existsSync(FILEPATH)) {
    return res.status(200).sendFile(FILEPATH);
  } else {
    return res.status(404).json({Message:"Logo no encontrado"});
  }
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

const MONGO = DBLINK||"mongodb://127.0.0.1:27017/TEST?authSource=admin";

console.log(MONGO);
console.log('api: '+api);
console.log('HOST: ' + HOST);
console.log('APIHOST: ' + APIHOST);
const start = async () => {
  try {
    await mongoose.connect(MONGO);
    app.use(allowCrossDomain);
    app.listen(PORT, () => console.log(`Server started on port =${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();