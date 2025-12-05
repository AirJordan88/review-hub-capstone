import {
  getCommentsForReview,
  createCommentQuery,
  updateCommentQuery,
  deleteCommentQuery,
} from "./queries.js";

// GET comments for a review
export const getComments = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const comments = await getCommentsForReview(reviewId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// CREATE comment
export const createComment = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId, text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const comment = await createCommentQuery(reviewId, userId, text);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};

// UPDATE comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const updatedComment = await updateCommentQuery(commentId, text);

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
};

// DELETE comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deleted = await deleteCommentQuery(commentId);

    if (!deleted) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted", deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
