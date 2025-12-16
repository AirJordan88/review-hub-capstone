import db from "#db/client.js";

// Get all comments for a review
export const getCommentsForReview = async (reviewId) => {
  const result = await db.query(
    `SELECT * FROM comments 
     WHERE review_id = $1
     ORDER BY created_at DESC`,
    [reviewId]
  );
  return result.rows;
};

// Create a new comment
export const createCommentQuery = async (reviewId, userId, text) => {
  const result = await db.query(
    `INSERT INTO comments (review_id, user_id, text)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [reviewId, userId, text]
  );
  return result.rows[0];
};

// Update a comment
export const updateCommentQuery = async (commentId, text) => {
  const result = await db.query(
    `UPDATE comments
     SET text = $1
     WHERE id = $2
     RETURNING *`,
    [text, commentId]
  );
  return result.rows[0];
};

// Delete a comment
export const deleteCommentQuery = async (commentId) => {
  const result = await db.query(
    `DELETE FROM comments
     WHERE id = $1
     RETURNING *`,
    [commentId]
  );
  return result.rows[0];
};
