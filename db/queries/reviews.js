import db from "#db/client.js";

export async function createReviews(item_id, user_id, rating, comment) {
  const sql = `
    INSERT INTO reviews (item_id, user_id, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
  const { rows } = await db.query(sql, [item_id, user_id, rating, comment]);
  return rows[0];
}

export async function getReviewById(id) {
  const sql = `
  SELECT * FROM reviews WHERE id = $1
  `;
  const { rows } = await db.query(sql, [id]);
  return rows[0];
}

export async function getReviewsByItem(item_id) {
  const sql = `
  SELECT * FROM reviews WHERE item_id = $1 ORDER BY rating
  `;
  const { rows } = await db.query(sql, [item_id]);
  return rows;
}

export async function deleteReviewQuery(id) {
  const sql = `
  DELETE FROM reviews WHERE id = $1
  RETURNING *
  `;
  const { rows } = await db.query(sql, [id]);
  return rows[0];
}
