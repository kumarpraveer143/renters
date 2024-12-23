import mongoose from "mongoose";

const historySchema = new Schema({
  relationId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
