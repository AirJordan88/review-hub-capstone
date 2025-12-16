import app from "#app";
import db from "#db/client.js";
import { URL } from "node:url";

const PORT = process.env.PORT ?? 3000;

async function start() {
  try {
    console.log("NODE_ENV =", process.env.NODE_ENV);
    console.log("DATABASE_URL is set =", Boolean(process.env.DATABASE_URL));
    if (process.env.DATABASE_URL) {
      console.log(
        "DATABASE_URL host =",
        new URL(process.env.DATABASE_URL).host
      );
    }
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
