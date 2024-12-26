import mongoose from "mongoose";

const connectToMongoose = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kumarpraveernit:Is6zFJx7fbgXDoSr@renter.arv5h.mongodb.net/"
    );
    console.log("Mongoose is connected Successfully!");
  } catch (err) {
    console.log("Something went wrong with DB");
  }
};

export default connectToMongoose;
