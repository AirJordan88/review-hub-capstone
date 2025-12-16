import app from "#app";
import db from "#db/client.js";
import { URL } from "node:url";

const PORT = process.env.PORT ?? 3000;

async function start() {
  try {
    await db.connect();
    console.log("Database connected.");

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
}

start();
