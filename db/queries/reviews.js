import db from "#db/client";

export async function createReviews(item_id, user_id, rating, comment) {
  const sql = `
    INSERT INTO reviews (item_id, user_id, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [reviews],
  } = await db.query(sql, [item_id, user_id, rating, comment]);
  return reviews;
}

export async function getReviewById(id) {
  const sql = `
  SELECT * FROM reviews WHERE id = $1
  `;
  const {
    rows: [review_id],
  } = await db.query(sql, [id]);
  return review_id;
}

export async function getReviewsByItem(item_id) {
  const sql = `
  SELECT * FROM reviews WHERE item_id = $1 ORDER BY rating
  `;
  const {
    rows: [reviews],
  } = await db.query(sql, [item_id]);
  return reviews;
}

export async function deleteReview(id) {
  const sql = `
  DELETE FROM reviews WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [deletereview],
  } = await db.query(sql, [id]);
  return deletereview;
}
