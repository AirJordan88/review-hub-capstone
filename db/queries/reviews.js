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
