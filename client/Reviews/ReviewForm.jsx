import { useState } from "react";
import { createReview } from "./Review";
import { useAuth } from "../src/auth/AuthContext";

// form where users can create a new review
export default function ReviewForm() {
  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryCreateReview = async (formData) => {
    setError(null);

    const rating = formData.get("rating");
    const comment = formData.get("comment");

    try {
      await createReview(token, { rating, comment });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h2>Add a new review</h2>
      <form action={tryCreateReview}>
        <label>
          Rating <input type="text" name="rating" />
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
