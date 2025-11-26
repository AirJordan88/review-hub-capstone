import db from "#db/client";

export async function createItem(title, description, category, url) {
  const sql = `
    INSERT INTO item (title, description, category, url)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [item],
  } = await db.query(sql, [title, description, category, url]);
  return item;
}
