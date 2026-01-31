/*                        Libraries                */ 
require('dotenv').config();
const express=require('express');
const cors = require('cors');
const morgan = require('morgan');
const limit = require('./middleware/rateLimit');
const helmet = require('helmet')
const hpp = require('hpp');;
const AppError = require('./utils/appError');





const app = express();
app.set('trust proxy', 1);


app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL}));  
app.use(helmet());
app.use('/api',limit)
app.use(express.json({limit:'10kb'})); 
app.use(hpp());




/*                 import Router                */

const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const logRouter = require('./routes/logRoutes');


/*              Router                    */

app.use('/api/', userRouter)
app.use('/api/task', taskRouter)
app.use('/api/log', logRouter)



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
