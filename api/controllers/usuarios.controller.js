'use strict'

const bcrypt = require("bcrypt");
const Usuario = require('../models/usuarios.model');
const BitacoraController = require("./bitacora.controller");

async function registrar(req, res){
    const usuario = req.body.Usuario;
    const { Nombre, Secret, Rol } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await Usuario.findOne({ Usuario:usuario });
    if (existingUser) {
        return res.status(409).json({ message: "El nombre de usuario ya está en uso" });
    }

    // Generar el hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(Secret, 10);

    // Crear un nuevo usuario con los datos proporcionados
    const newUser = new Usuario({
        Nombre,
        Usuario:usuario,
        Secret: hashedPassword,
        Rol
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    if(newUser){
        BitacoraController.registrar("creo al usuario: "+newUser.Usuario+", con ID: "+newUser.id, req.usuario.id);
    }

    return res.status(201).json({ message: "Usuario registrado exitosamente" });
}

async function verAll(req, res) {
    try {
        if (!req.usuario) {   
            return res.status(403).json({ message: "No ha iniciado sesion" });
        }
    }catch(er){}
    if(!req.usuario.privilegios.admin.usuarios.read){
        return res.status(401).json({ message: "No tiene permiso para realizar esa operacion!" });
    }
    const allUsuarios = await Usuario.find();
    return res.status(200).json(allUsuarios);
}

async function ver1 (req, res){
    if(!req.usuario.privilegios.admin.usuarios.read){
        return res.status(401).json({ message: "No tiene permiso para realizar esa operacion!" });
    }
    const usuario = await Usuario.findById(req.params.id).select('-Secret');
    return res.status(200).json(usuario);
}

async function editar(req, res){
    if(!req.usuario.privilegios.admin.usuarios.update){
        return res.status(401).json({ message: "No tiene permiso para realizar esa operacion!" });
    }
    const usuario = req.body;

    if(usuario.Secret){
    // Generar el hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(usuario.Secret, 10);
    usuario.Secret = hashedPassword;
    }
    const usuarioEdited = await Usuario.findByIdAndUpdate(usuario._id,usuario);
    if(usuarioEdited){
        BitacoraController.registrar("modifico al usuario: "+usuarioEdited.Usuario+", con ID: "+usuarioEdited.id, req.usuario.id);
    }
    return res.status(200).json(usuarioEdited);
}

async function eliminar(req, res){
    if(!req.usuario.privilegios.admin.usuarios.delete){
        return res.status(401).json({ message: "No tiene permiso para realizar esa operacion!" });
    }
    const id = req.params.id;
    const usuarioConsulted = await Usuario.findById(id);
    const estado = !usuarioConsulted.estado;
    const usuarioEdited = await Usuario.findByIdAndUpdate(id,{estado:estado});
    if(usuarioEdited){
        BitacoraController.registrar("elimino al usuario: "+usuarioEdited.Usuario+", con ID: "+usuarioEdited.id, req.usuario.id);
    }


    return res.status(200).json(usuarioEdited);
}

module.exports = {
    registrar,
    verAll,ver1,
    editar,
    eliminar
}