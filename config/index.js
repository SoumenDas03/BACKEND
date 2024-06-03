const dotenv = require("dotenv");

dotenv.config();

const {App_PORT, DB_URL } = process.env

module.exports={App_PORT, DB_URL}
