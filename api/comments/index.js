import { Router } from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "./controller.js";

const router = Router();

// GET all comments for a review
router.get("/:reviewId", getComments);

// CREATE a comment
router.post("/:reviewId", createComment);

// UPDATE a comment
router.put("/edit/:commentId", updateComment);

// DELETE a comment
router.delete("/delete/:commentId", deleteComment);

export default router;
