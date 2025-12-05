import express from "express";
const router = express.Router();
export default router;

import {
  createReviews,
  getReviewsByItem,
  deleteReview,
} from "#db/queries/reviews";
import { getItemById } from "#db/queries/item";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router.get("/:id/reviews", async (req, res) => {
  try {
    const itemId = Number(req.params.id);

    if (!Number.isInteger(itemId) || itemId <= 0) {
      return res.status(400).json({ error: "Id must be an postive number" });
    }

    const item = await getItemById(itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const reviews = await getReviewsByItem(itemId);
    res.status(201).json(reviews);
  } catch (error) {
    console.error("Couldn't fetch GET /items/:id/reviews", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/:id/reviews",
  requireUser,
  requireBody(["rating", "comment"]),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User must be loggged in" });
      }

      const itemId = Number(req.params.id);
      const userId = req.user.id;
      const { rating, comment } = req.body;

      if (!userId || !rating || !comment) {
        return res.status(400).json({
          error:
            "requestBody is missing required fields: user_id, rating, comment",
        });
      }

      const item = await getItemById(itemId);

      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      const newReview = await createReviews(itemId, userId, rating, comment);
      res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
