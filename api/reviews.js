import express from "express";

import { getReviewById, deleteReviewQuery } from "#db/queries/reviews";
import requireUser from "#middleware/requireUser";

const router = express.Router();

// still gotta test this code once frontend is working.

router.delete("/:id", requireUser, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User must be loggged in" });
    }

    const reviewId = Number(req.params.id);

    console.log("Deleting review with ID:", reviewId);

    const review = await getReviewById(reviewId);
    console.log("Found review:", review);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (review.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Forbidden: cannot delete this review" });
    }

    const deleteReviews = await deleteReviewQuery(reviewId);
    res.status(200).json(deleteReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
