import express from 'express';

import con from './config/db.js'
import  {getUserEntries, UpdateTransfers, getSingleUser }  from './controllers/bankController.js'
import bodyParser from 'body-parser';

const app = express();
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = 5000





app.get('/', getUserEntries )

app.post('/transfers', UpdateTransfers)
app.get('/read/:id', getSingleUser)


app.listen(port, (req,res,next) => {
    console.log(`Running the application at the ${port}`)

})