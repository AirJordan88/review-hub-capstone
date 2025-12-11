import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { apiRequest } from "../api/client";
import ReviewsPage from "../../Reviews/ReviewPage";
import { useAuth } from "../auth/AuthContext";

import "../../Reviews/review.css";

export default function ItemDetail() {
  const { token } = useAuth();
  const { id } = useParams(); // read :id from the URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await apiRequest(`/items/${id}`);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) return <p>Loading item...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>Item not found.</p>;

  const isLoggedIn = !!token;

  return (
    <div>
      {!isLoggedIn && (
        <div id="overlay">
          <div id="box-styles">
            <h2>Unlock Full ReviewHub Benefits</h2>
            <p>
              Sign in or create an account to link this review to your profile
              and track your contributions.
            </p>
            <div>
              <Link id="overlay-btn" to="/login">
                Sign Up
              </Link>
              <Link id="overlay-btn" to="/register">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
      <Link to="/item">← Back to all items</Link>
      <h2>{item.title}</h2>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
      <p>
        <strong>Description:</strong> {item.description}
      </p>
      <p>
        <strong>Link:</strong>{" "}
        <a href={item.url} target="_blank" rel="noreferrer">
          {item.url}
        </a>
      </p>
      <ReviewsPage />
    </div>
  );
}
