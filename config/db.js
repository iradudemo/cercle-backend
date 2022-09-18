const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });

  console.log(`Db connected: ${conn.connection.host}`);
};

mongoose.connection.on("disconnected", () => {
  console.log(`Db disconnected!!!!!!!!`);
});
module.exports = connectDB;
