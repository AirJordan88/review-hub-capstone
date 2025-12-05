import express from "express";
import { getAllItems, getItemById, createItem } from "#db/queries/item";
import { getReviewsByItem, createReviews } from "#db/queries/reviews";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

const router = express.Router();

// GET /items - Returns all items (things that can be reviewed).
router.get("/", async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.send(items);
  } catch (err) {
    next(err);
  }
});

// GET /items/:id - Returns a single item by its id.
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // Must be a positive integer
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send("Item id must be a positive integer.");
    }

    const item = await getItemById(id);

    if (!item) {
      return res.status(404).send("Item not found.");
    }

    res.send(item);
  } catch (err) {
    next(err);
  }
});

// POST /items - Creates a new item. Requires a logged-in user and a valid request body.

router.post(
  "/",
  requireUser,
  requireBody(["title", "description", "category", "url"]),
  async (req, res, next) => {
    try {
      const { title, description, category, url } = req.body;

      const item = await createItem(title, description, category, url);

      res.status(201).send(item);
    } catch (err) {
      next(err);
    }
  }
);

// NB added these routes
//GET /items/:id/post all reviews by item id

router.get("/:id/reviews", async (req, res) => {
  try {
    const itemId = Number(req.params.id);

    if (!Number.isInteger(itemId) || itemId <= 0) {
      return res.status(400).json({ error: "Id must be an positive number" });
    }

    const item = await getItemById(itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const reviews = await getReviewsByItem(itemId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Couldn't fetch GET /items/:id/reviews", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /items/:id/post a new review

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

export default router;
