"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.status(200).json({
        msg: "getUsuarios funcionando",
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.status(200).json({ usuario });
    }
    else {
        res.status(404).json({
            error: `Error: el usuario con id: ${id} no existe en db`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email } = req.body;
    const userData = { nombre, email };
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `El email ${email}, ya existe en la BD`
            });
        }
        if (!userData.email || !userData.nombre) {
            return res.status(400).json({
                ERROR: "Faltan Campor Obligatorios"
            });
        }
        const usuario = yield usuario_1.default.create(userData);
        res.status(201).json({
            usuario
        });
    }
    catch (error) {
        res.status(500).json({
            Error: "Error al crear un nuevo usuario",
            error
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                mensaje: `No existe el usuario con ID ${id}`
            });
        }
        yield usuario.update(body);
        res.json({ usuario });
    }
    catch (error) {
        res.status(500).json({
            Error: "Error al actualizar un usuario",
            error
        });
    }
    res.status(200).json({
        msg: "puttUsuario funcionando",
        body,
        id
    });
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                mensaje: `No existe el usuario con ID ${id}`
            });
        }
        yield usuario.update({ estado: false });
        // await usuario.destroy()
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({
            msg: "ERROR AL BORRAR USUARIO" + id,
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.controllers.js.map