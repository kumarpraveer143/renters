import mongoose from "mongoose";
import requestSchema from "./request.schema.js";

const requestModel = mongoose.model("Request", requestSchema);

class RequestRepository {
  async toggleRequest(renterId, roomId) {
    const existingRequest = await requestModel.findOne({ renterId, roomId });

    if (!existingRequest) {
      const newRequest = new requestModel(renterId, roomId);
      await newRequest.save();
      return newRequest;
    } else {
      const deletedRequest = await requestModel.findOneAndDelete({
        renterId,
        roomId,
      });
      return deletedRequest;
    }
  }
}
export default RequestRepository;
