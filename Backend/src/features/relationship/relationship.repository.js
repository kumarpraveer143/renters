import mongoose from "mongoose";
import relationshipSchema from "./relationship.schema.js";
import RoomRepository from "../rooms/room.repository.js";
import RequestRepository from "../request/request.respository.js";

const relationshipModel = mongoose.model("relationship", relationshipSchema);

const roomRepository = new RoomRepository();
const requestRepository = new RequestRepository();

class RelationshipSchma {
  async acceptRequest(acceptObj) {
    const newRelationShip = new relationshipModel(acceptObj);
    const { roomId } = acceptObj;
    const room = await roomRepository.changeStatus(roomId);
    const request = await requestRepository.deleteAllRequest(roomId);
    await newRelationShip.save();
    return newRelationShip;
  }
}

export default RelationshipSchma;
