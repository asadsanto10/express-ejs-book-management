const mongoose = require('mongoose');
// database
// const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.npxlx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const database = process.env.DATABASE_URI;
// mongoose
const connect = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('connect to database');
  } catch (err) {
    console.log(`${err}error to database`);
  }
};
connect();
