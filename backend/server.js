const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

//handle uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
})
//console.log(a); //test uncaught exception




// Connecting to database
connectDatabase();

dotenv.config({ path: 'backend/config/config.env' })




const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
//Handle Unhandled Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})