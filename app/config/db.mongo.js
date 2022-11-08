require('dotenv').config();
module.exports = {
  HOST: process.env.MYSQL_HOST || "localhost",
  PORT: process.env.MYSQL_PORT || "27017",
};