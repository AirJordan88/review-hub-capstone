import express from "express";
import cors from "cors";
import morgan from "morgan";

import usersRouter from "#api/users.js";
import itemsRouter from "#api/item.js";
import commentsRouter from "#api/comments.js";
import reviewRouter from "#api/reviews.js";

import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";

const app = express();
export default app;

// CORS: allow Netlify URL in production, allow localhost in dev
app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.get("/", (req, res) => res.send("Hello, World!"));

// ✅ Consistent API prefix
app.use("/api/users", usersRouter);
app.use("/api/items", itemsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/reviews", reviewRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
