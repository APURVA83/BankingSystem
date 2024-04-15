import con from '../config/db.js'
import AsyncHandler from 'express-async-handler'
import express from 'express';
import bodyParser from 'body-parser';
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const getSingleUser = AsyncHandler(async(req,res) => {
   
    const id = req.params.id;
    const [results, fields] = await con.query('SELECT * FROM `Users` WHERE id = ?', [id]);
    console.log(results)
    if(results) {
        res.send(results)
    }
    else {
       res.status(404)
       throw new Error('Results not found')
     }

    
});





const getUserEntries = AsyncHandler(async (req,res) => {
 
     await con.beginTransaction()
     const [results, fields] = await con.query('select * from `Users`');
     console.log(results[0].account_balance)
     if(results) {
         res.send(results)
     }
     else {
        res.status(404)
        throw new Error('Results not found')
      }
});


const UpdateTransfers = AsyncHandler ( async (req,res) => {



    
    try {
        const { sender_id, receiver_id, amount } = req.body;

        console.log(req.body.sender_id, req.body.amount)
       // const sqlGetSenderBalance = 'SELECT account_balance FROM `Users` WHERE id = ?';
        const sqlGetReceiverBalance = 'SELECT account_balance FROM `Users` WHERE id = ?';
        const sqlCreateTransfer = 'INSERT INTO `Transfers` (sender_id, receiver_id, amount) VALUES (?, ?, ?)';
        const sqlUpdateSenderBalance = 'UPDATE `Users` SET account_balance = ? WHERE id = ?';
        const sqlUpdateReceiverBalance = 'UPDATE `Users` SET account_balance = ? WHERE id = ?';


     

        const [results, fields] = await con.query('SELECT account_balance FROM `Users` WHERE id = ?', [sender_id]);
        console.log(results)
        if (!results || results.length === 0) {
          return res.status(404).json({ error: 'Sender not found or query error' });
        }
        const senderBalance = results[0].account_balance;
        console.log(senderBalance)


        if (senderBalance < amount) {   
            return res.status(400).json({ error: 'Insufficient balance' });
        }
        await con.beginTransaction();
        // Deduct amount from sender's balance
        const updatedSenderBalance = senderBalance - amount; //500  - 400 = 100
        await con.query(sqlUpdateSenderBalance, [updatedSenderBalance, sender_id]);

        // Add amount to receiver's balance
        const [receiverBalanceRows] = await con.query(sqlGetReceiverBalance, [receiver_id]);
        const receiverBalance = receiverBalanceRows[0].account_balance;
        const updatedReceiverBalance = receiverBalance + amount;  //500 + 100
        console.log(`Updated Receiver Balance`, updatedReceiverBalance)
        await con.query(sqlUpdateReceiverBalance, [updatedReceiverBalance, receiver_id]);

        // Create transfer record
        await con.query(sqlCreateTransfer, [sender_id, receiver_id, amount]);

        // Commit the transaction
        await con.commit();

        res.status(201).send('Transfer created successfully');
    } catch (err) {
        await con.rollback();
        throw err;
    }



});


export {

    getUserEntries,
    UpdateTransfers,
    getSingleUser

}













export default getUserEntries;