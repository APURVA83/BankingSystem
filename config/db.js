import mysql from 'mysql2/promise';



 
  

        const con = await mysql.createConnection({
             host :'localhost',
             user : 'root',
             password: '12345',
             database: 'bank'

        });
        
    

       console.log(`Connected to ${JSON.stringify(con.config.database)}`)
        
   




export default con;