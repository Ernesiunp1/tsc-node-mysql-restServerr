import express, {Application ,json} from "express";
import  userRoutes  from "../routes/usuario.routes";
import cors from "cors";
import db from "../db/conections";

class Server {

    private app: Application
    private port: string
    private pathsUsuarios = {
            usuarios : '/api/usuarios'
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000'
        // conecion a base de datos
        this.dbConection()
        // middlewares
        this.middlewares()
        // Rutas 
        this.routes()
        // aRCHIVOS ESTATICOS, CARPETA PUBLICA
        this.app.use(express.static('public'))

      
    }

    

    async dbConection(){
        try {


            await db.authenticate()
            console.log('DataBase Online');
            


            
        } catch (error) {
            throw new Error("error");
            
        }
    }


    middlewares(){
        // cors
        this.app.use( cors() )
        // parsear el body
        this.app.use( express.json() )
        // carpeta publica
    }

    routes(){
        this.app.use(this.pathsUsuarios.usuarios, userRoutes )
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto ' + this.port);
        })
    }
         

}


export default Server