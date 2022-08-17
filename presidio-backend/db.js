require("dotenv").config();
const {
    MongoClient
} = require("mongodb");

const client = new MongoClient(
    process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = client;