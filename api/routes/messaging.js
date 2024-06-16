import express from "express";
import { getMessages, sendMessage, getUsersForSidebar } from "../controllers/message.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/users", getUsersForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

export default router;
