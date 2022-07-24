const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect(`mongodb+srv://root:mypassword@project-nodejs.3l3kq.mongodb.net/shopit?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase