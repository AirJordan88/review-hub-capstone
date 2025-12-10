import { useState } from "react";
import { createReview } from "./Review";
import { useAuth } from "../src/auth/AuthContext";
import { useParams } from "react-router";

// form where users can create a new review
export default function ReviewForm({ syncReviews }) {
  const { token } = useAuth();
  const { id } = useParams();

  const [error, setError] = useState(null);

  const tryCreateReview = async (formData) => {
    setError(null);

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
    </>
  );
}
