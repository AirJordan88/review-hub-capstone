import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createReviews } from "./queries/reviews.js";
import { createItem } from "./queries/item.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // creates mock users details
  const user1 = await createUser("alice", "password123");
  const user2 = await createUser("bob", "password456");
  const user3 = await createUser("john", "john789");

  // creates fake items to seed the database with
  const item1 = await createItem(
    "The Matrix",
    "A sci-fi action classic.",
    "Movies",
    "https://example.com/matrix"
  );
  const item2 = await createItem(
    "Elden Ring",
    "Open-world action RPG.",
    "Video Games",
    "https://example.com/eldenring"
  );
  const item3 = await createItem(
    "Samsung Refrigerator X1",
    "Energy-efficient smart fridge.",
    "Electronics",
    "https://example.com/samsung-fridge"
  );
  const itme4 = await createItem(
    "Pasta Palace",
    "Local Italian restaurant with handmade pasta.",
    "Restaurants",
    "https://example.com/pasta-palace"
  );
  const item5 = await createItem(
    "Nintendo Switch",
    "Hybrid handheld/home gaming system.",
    "Electronics",
    "https://example.com/switch"
  );

  // creates reviews
  await createReviews(item1.id, user1.id, 5, "Amazing movie. A must-watch.");
  await createReviews(item3.id, user2.id, 4, "Very good, but pacing is slow.");
  await createReviews(item2.id, user3.id, 5, "Masterpiece of game design.");
  await createReviews(itme4.id, user1.id, 3, "Good fridge but noisy.");
  await createReviews(itme4.id, user2.id, 4, "Great pasta and friendly staff.");
  await createReviews(
    item5.id,
    user3.id,
    5,
    "Fantastic console with great games."
  );
}
