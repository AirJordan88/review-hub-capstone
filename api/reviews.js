import express from "express";
const router = express.Router();
export default router;

import { getReviewById, deleteReview } from "#db/queries/reviews";
import requireUser from "#middleware/requireUser";

// still gotta test this code once frontend is working.

router.delete("/:id", requireUser, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User must be loggged in" });
    }

    const reviewId = Number(req.params.id);

    const review = await getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    const deleteReview = await deleteReview(reviewId);
    res.status(204).json({ error: "review deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
