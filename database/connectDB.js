const { default: mongoose } = require("mongoose");

async function ConnectDB() {
    try {
        const con = await mongoose.connect(process.env.MONGO_PORT)
        console.log(`database connected on ${con.connection.host}`);
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = ConnectDB