import RequestRepository from "../request/request.respository.js";
import RelationshipSchma from "./relationship.repository.js";

class RelationshipController {
  constructor() {
    this.relaltionshipRepository = new RelationshipSchma();
    this.requestRepository = new RequestRepository();
  }
  async accept(req, res) {
    const ownerId = req.userId;
    const { roomId, renterId } = req.body;

    try {
      const newRequest = await this.relaltionshipRepository.acceptRequest({
        ownerId,
        roomId,
        renterId,
      });
      return res
        .status(200)
        .json({ success: true, message: "Added to your room" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  async rejectRequest(req, res) {
    const { renterId, roomId } = req.body;
    try {
      const rejectedReq = await this.requestRepository.deleteRequestByRandR(
        renterId,
        roomId
      );
      return res.status(200).json({ success: true, message: rejectedReq });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }
}

export default RelationshipController;
