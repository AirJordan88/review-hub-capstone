import { useState } from "react";
import { createReview } from "./Review";
import { useAuth } from "../src/auth/AuthContext";
import { useParams, Link } from "react-router";

import "./review.css";

// form where users can create a new review
export default function ReviewForm({ syncReviews }) {
  const { token } = useAuth();
  const { id } = useParams();
  const [showOops, setShowOops] = useState(false);

  const [error, setError] = useState(null);

  const tryCreateReview = async (formData) => {
    setError(null);

    if (!token) {
      setShowOops(true);
      return;
    }

    const rating = formData.get("rating");
    const comment = formData.get("comment");

    try {
      await createReview(token, id, { rating, comment });
      syncReviews();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div>
        {showOops && (
          <div id="overlay">
            <div id="box-styles">
              <button id="close-btn" onClick={() => setShowOops(false)}>
                ×
              </button>
              <h2>Unlock Full ReviewHub Benefits</h2>
              <p>
                Sign in or create an account to link this review to your profile
                and track your contributions.
              </p>
              <div>
                <Link id="overlay-btn" to="/login">
                  Sign In
                </Link>
                <Link id="overlay-btn" to="/register">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        )}
        <div>
          <h2>Add a new review</h2>
          <form action={tryCreateReview}>
            <label>
              Rating <input type="text" name="rating" min="1" max="5" />
            </label>
            <label>
              {" "}
              Comment <input type="text" name="comment" />
            </label>
            <button>Add Review</button>
          </form>
          {error && <p role="alert">{error}</p>}
        </div>
      </div>
    </>
  );
}
