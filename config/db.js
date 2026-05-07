const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Add it to backend/.env before starting the server.");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    const authHint =
      error?.codeName === "AtlasError" || /auth/i.test(error?.message || "")
        ? " Check the Atlas database username/password in MONGO_URI."
        : "";

    throw new Error(`MongoDB connection failed: ${error.message}.${authHint}`);
  }
};

module.exports = connectDB;
