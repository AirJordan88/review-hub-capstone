import { Link } from "react-router";
import capstoneImage from "../assets/capstone-image.png";
import "./homepage.css";

export default function HomePage() {
  return (
    <section id="home">
      <div>
        <h1>Discover, Rate, Review. Your Universe Of Content Awaits</h1>
        <p id="discover">
          Explore a vast collection of movies, games, books, and local spots.
          Share your opinions, read honest reviews, and find your next favorite.
        </p>

        <Link id="content" to="/item">
          Browse Content &rarr;
        </Link>
        <Link id="sign-up" to="/register">
          Join ReviewHub
        </Link>
      </div>

      <div>
        <img src={capstoneImage} alt="cover image" />
      </div>
    </section>
  );
}
