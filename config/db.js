import mysql from 'mysql2/promise';



 
  

        const con = await mysql.createConnection({
             host :'sql6.freesqldatabase.com',
             user : 'sql6699140',
             password: '1EuPq9pm25',
             database: 'sql6699140'

        });
        
    

       console.log(`Connected to ${JSON.stringify(con.config.database)}`)
        
   




export default con;