import db from "#db/client.js";

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

export async function getAllItems() {
  const sql = `
    SELECT *
    FROM item
    ORDER BY id;
  `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getItemById(id) {
  const sql = `
    SELECT *
    FROM item
    WHERE id = $1
  `;
  const {
    rows: [item],
  } = await db.query(sql, [id]);
  return item || null;
}
