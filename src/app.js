/*                        Libraries                */ 
require('dotenv').config();
const express=require('express');
const cors = require('cors');
const morgan = require('morgan');




const app = express();


app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL}));  

app.use(express.json()); 





/* --------------Global error middleware----------------------*/

app.all("/*splat", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})


app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    if (err.isOperational) {
        res.status(statusCode).json({ success: false, error: err.message });
    } else {

        console.error('SYSTEM ERROR:', err);

        res.status(500).json({ success: false, error: "Something went wrong! Please try again later." });

    }
})


/*               Start Server                                  */

const port =process.env.PORT || 3000
app.listen(port, () =>  {
    console.log(`Listening on ${port}`)
})
