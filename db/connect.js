const mongoose = require('mongoose');
// database
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
