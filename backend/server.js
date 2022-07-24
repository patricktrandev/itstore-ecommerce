const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

// Connecting to database
connectDatabase();

dotenv.config({ path: 'backend/config/config.env' })
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

