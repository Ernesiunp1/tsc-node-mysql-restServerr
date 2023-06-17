import { Request, Response} from "express";
import Usuario from "../models/usuario";



export const getUsuarios= async ( req: Request, res: Response)=>{

    const usuarios = await Usuario.findAll()


    
    res.status(200).json({
        msg: "getUsuarios funcionando",
        usuarios
    })
}


export const getUsuario= async ( req: Request, res: Response)=>{

    const {id} = req.params
    const usuario = await Usuario.findByPk(id)

    if (usuario) {
        res.status(200).json({ usuario })

    }else{
        res.status(404).json({
            error:`Error: el usuario con id: ${id} no existe en db`
        })
    }

    
}


export const postUsuario= async ( req: Request, res: Response)=>{

    const {nombre, email} = req.body   
    const userData = { nombre, email }
    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email : email
            }
        })

        if (existeEmail) {
            return res.status(400).json({
                msg: `El email ${email}, ya existe en la BD`
            })
        }

        if (!userData.email || !userData.nombre) {
           return  res.status(400).json({
                ERROR: "Faltan Campor Obligatorios"
            })
        }

        const usuario = await Usuario.create(userData)
        res.status(201).json({
            usuario
        }) 

    } catch (error) {
        res.status(500).json({
            Error:"Error al crear un nuevo usuario",
            error
        }) 
    }    

}

export const putUsuario= async ( req: Request, res: Response)=>{

    const {id} = req.params
    const {body} = req
    

    try {

        const usuario = await Usuario.findByPk( id )
        if (!usuario){
            return res.status(404).json({
                mensaje : `No existe el usuario con ID ${id}`
            })
        }
        

        await usuario.update(body)

        res.json({usuario})



    } catch (error) {
        res.status(500).json({
            Error:"Error al actualizar un usuario",
            error
        }) 
        
    }






    res.status(200).json({
        msg: "puttUsuario funcionando",
        body,
        id
    })
}


export const deleteUsuario= async ( req: Request, res: Response)=>{

    const {id} = req.params
    

    try {

        const usuario = await Usuario.findByPk( id )
        if (!usuario){
            return res.status(404).json({
                mensaje : `No existe el usuario con ID ${id}`
            })
        }

        await usuario.update({estado: false})

        // await usuario.destroy()

        res.json(usuario)



    } catch (error) {
        res.status(500).json({
            msg: "ERROR AL BORRAR USUARIO" + id,            
        })
        
    }
    
}