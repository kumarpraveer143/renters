import express from "express";
import RelationshipController from "./relationship.controller.js";
import landOwnerAuth from "../../middleware/landOwners.js";

const relationshipRouter = express.Router();

const relationshipController = new RelationshipController();

//route to accept the request of the user
relationshipRouter.post("/accept", landOwnerAuth, (req, res) => {
  relationshipController.accept(req, res);
});

//route to reject the request of the renters
relationshipRouter.post("/reject", (req, res) => {
  relationshipController.rejectRequest(req, res);
});

export default relationshipRouter;
