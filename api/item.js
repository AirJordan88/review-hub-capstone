import express from "express";
import { getAllItems, getItemById, createItem } from "#db/queries/item";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

const router = express.Router();

// Returns all items (things that can be reviewed).
router.get("/", async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.send(items);
  } catch (err) {
    next(err);
  }
});

// Returns a single item by its id.
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

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

//Creates a new item. Requires a logged-in user and a valid request body.
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

export default router;
