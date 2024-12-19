import RequestRepository from "./request.respository.js";

class RequestController {
  constructor() {
    this.requestRespoitory = new RequestRepository();
  }
  async toggleRequest(req, res) {
    const userId = req.userId;
    const roomId = req.params.id;
    try {
      const switchRequest = await this.requestRespoitory.toggleRequest(
        userId,
        roomId
      );
      return res.status(200).json({ success: true, request: switchRequest });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }

  async getRequest(req, res) {
    const userId = req.userId;
    const roomId = req.params.id;
    try {
      const request = await this.requestRespoitory.getRequest(userId, roomId);
      if (request) {
        return res
          .status(200)
          .json({ success: true, message: "yes request is there!" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "No request is not there!" });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong with database",
      });
    }
  }
}

export default RequestController;
