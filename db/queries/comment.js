import db from "#db/client.js";

export async function createComment(user_id, review_id, date, comment) {
  const sql = `
    INSERT INTO comments (user_id, review_id, date, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [comments],
  } = await db.query(sql, [user_id, review_id, date, comment]);
  return comments;
}
