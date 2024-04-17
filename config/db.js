import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config()


        const con = await mysql.createConnection({
             host : process.env.host,
             user : process.env.user,
             password: process.env.password,
             database: process.env.database

        });
        
    

       console.log(`Connected to ${JSON.stringify(con.config.data)}`)
        
   




export default con;