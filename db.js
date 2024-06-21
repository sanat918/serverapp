const mongoose = require('mongoose');
require('dotenv').config()
const url = process.env.DATABASEURL;

const connectToMongo = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

module.exports = connectToMongo;
