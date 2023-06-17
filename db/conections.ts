import { Sequelize } from 'sequelize';


const db = new Sequelize('node_tsc_curso', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
})


export default db