import express from "express";
import jwtAuth from "../../middleware/jwtAuth.js";
import RequestController from "./request.controller.js";
import landOwnerAuth from "../../middleware/landOwners.js";

const requestRouter = express.Router();

const requestController = new RequestController();

requestRouter.post("/:id", jwtAuth, (req, res) => {
  requestController.toggleRequest(req, res);
});

requestRouter.get("/:id", jwtAuth, (req, res) => {
  requestController.getRequest(req, res);
});

//this is the route to get the user profile based on their roomId
requestRouter.get("/users/:id", landOwnerAuth, (req, res) => {
  requestController.getUsers(req, res);
});

export default requestRouter;
