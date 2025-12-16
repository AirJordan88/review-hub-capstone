import express from "express";
const router = express.Router();

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users.js";
import requireBody from "#middleware/requireBody.js";
import { createToken } from "#utils/jwt.js";

export default router;

router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await createUser(username, password);

      const token = await createToken({ id: user.id });
      res
        .status(201)
        .json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await getUserByUsernameAndPassword(username, password);
      if (!user) return res.status(401).send("Invalid username or password.");

      const token = await createToken({ id: user.id });
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Login failed1" });
    }
  });
