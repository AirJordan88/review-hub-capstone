import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createReviews } from "./queries/reviews.js";
import { createItem } from "./queries/item.js";
import { createComment } from "./queries/comment.js";

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
  const item4 = await createItem(
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
  const review1 = await createReviews(
    item1.id,
    user1.id,
    5,
    "Amazing movie. A must-watch."
  );
  const review2 = await createReviews(
    item3.id,
    user2.id,
    4,
    "Very good, but pacing is slow."
  );
  const review3 = await createReviews(
    item2.id,
    user3.id,
    5,
    "Masterpiece of game design."
  );
  const review4 = await createReviews(
    item4.id,
    user1.id,
    3,
    "Good fridge but noisy."
  );
  const review5 = await createReviews(
    item4.id,
    user2.id,
    4,
    "Great pasta and friendly staff."
  );
  const review6 = await createReviews(
    item5.id,
    user3.id,
    5,
    "Fantastic console with great games."
  );

  // seed comment table
  await createComment(
    user2.id,
    review1.id,
    new Date(),
    "I totally agree with your review — this movie was way better than expected."
  );
  await createComment(
    user3.id,
    review1.id,
    new Date(),
    "I thought the pacing was slow but the ending was great."
  );
  await createComment(
    user1.id,
    review3.id,
    new Date(),
    "Thanks for this! I was thinking about buying this product."
  );
  await createComment(
    user2.id,
    review4.id,
    new Date(),
    "Mine broke after a week… interested to see if yours lasts."
  );
  await createComment(
    user2.id,
    review5.id,
    new Date(),
    "Nice review! The food photos look amazing."
  );
  await createComment(
    user3.id,
    review5.id,
    new Date(),
    "I love this restaurant too, their brunch is the best."
  );
}
