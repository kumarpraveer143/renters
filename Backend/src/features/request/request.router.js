import express from "express";
import jwtAuth from "../../middleware/jwtAuth.js";
import RequestController from "./request.controller.js";

const requestRouter = express.Router();

const requestController = new RequestController();

requestRouter.post("/:id", jwtAuth, (req, res) => {
  requestController.toggleRequest(req, res);
});

export default requestRouter;
