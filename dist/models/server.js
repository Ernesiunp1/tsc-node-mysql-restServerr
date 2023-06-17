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
const express_1 = __importDefault(require("express"));
const usuario_routes_1 = __importDefault(require("../routes/usuario.routes"));
const cors_1 = __importDefault(require("cors"));
const conections_1 = __importDefault(require("../db/conections"));
class Server {
    constructor() {
        this.pathsUsuarios = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // conecion a base de datos
        this.dbConection();
        // middlewares
        this.middlewares();
        // Rutas 
        this.routes();
        // aRCHIVOS ESTATICOS, CARPETA PUBLICA
        this.app.use(express_1.default.static('public'));
    }
    dbConection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conections_1.default.authenticate();
                console.log('DataBase Online');
            }
            catch (error) {
                throw new Error("error");
            }
        });
    }
    middlewares() {
        // cors
        this.app.use((0, cors_1.default)());
        // parsear el body
        this.app.use(express_1.default.json());
        // carpeta publica
    }
    routes() {
        this.app.use(this.pathsUsuarios.usuarios, usuario_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map