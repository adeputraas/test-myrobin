require('dotenv').config();
const mongoose = require('mongoose');
async function mongooseSetUp() {
  try {
    await mongoose.connect(process.env.MONGODB_HOST);
    console.log('connect mongodb')
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

mongooseSetUp();