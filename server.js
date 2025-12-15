import app from "#app";
import db from "#db/client.js";

const PORT = process.env.PORT ?? 3000;

await db.connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

import commentRoutes from "#api/comments/index.js";

app.use("/api/comments", commentRoutes);
