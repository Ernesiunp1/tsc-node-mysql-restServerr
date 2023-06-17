import dotenv from "dotenv";
import Server from "./models/server";


// configuracion de dot.env
dotenv.config()

const server = new Server();


server.listen()