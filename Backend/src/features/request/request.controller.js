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
}

export default RequestController;
