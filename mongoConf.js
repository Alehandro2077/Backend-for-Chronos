import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db run successful");
  } catch (err) {
    console.log("db error", err);
  }
};

export default db;
