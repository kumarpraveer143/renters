import mongoose from "mongoose";
import relationshipSchema from "./relationship.schema.js";
import RoomRepository from "../rooms/room.repository.js";
import RequestRepository from "../request/request.respository.js";

const relationshipModel = mongoose.model("relationship", relationshipSchema);

const roomRepository = new RoomRepository();
const requestRepository = new RequestRepository();

class RelationshipSchma {
  //repository of accept the request of the renters
  async acceptRequest(acceptObj) {
    const newRelationShip = new relationshipModel(acceptObj);
    const { roomId } = acceptObj;
    const room = await roomRepository.changeStatus(roomId);
    const request = await requestRepository.deleteAllRequest(roomId);
    await newRelationShip.save();
    return newRelationShip;
  }

  //repository to get all the renters profile based of room and lanowner id
  async getRentersDetail(ownerId) {
    const findRelations = await relationshipModel
      .find({ ownerId })
      .populate("renterId")
      .populate("roomId");

    const extractedDetails = findRelations.map((item) => ({
      relationId: item._id,
      renterDetails: item.renterId,
      roomDetails: {
        roomId: item.roomId._id,
        roomType: item.roomId.roomType,
        rentPrice: item.roomId.rentPrice,
      },
    }));

    // let renters = findRelations.map((rel) => rel.renterId);
    return extractedDetails;
  }

  //find if a room is there in relation or not
  async findRelationByRoomId(roomId) {
    const relation = await relationshipModel.findOne({ roomId });
    return relation;
  }
}

export default RelationshipSchma;
