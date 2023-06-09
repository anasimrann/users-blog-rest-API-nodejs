const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Successfully connected to the database");
    } catch (err) {
        console.log(`${err} connecting to the database`);
    }
};

module.exports = connectToDb;