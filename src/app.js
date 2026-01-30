/*                        Libraries                */ 
require('dotenv').config();
const express=require('express');
const cors = require('cors');
const morgan = require('morgan');




const app = express();


app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL}));  

app.use(express.json()); 








/*               Start Server                                  */


const port =process.env.PORT || 3000
app.listen(port, () =>  {
    console.log(`Listening on ${port}`)
})
