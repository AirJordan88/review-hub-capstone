import { useEffect, useState } from "react";
import { getReviews } from "./Review";
import { useAuth } from "../src/auth/AuthContext";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API;

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [deleteErrors, setDeleteErrors] = useState({});
  const { token } = useAuth();
  const { id } = useParams();

  const syncReviews = async () => {
    if (!id) return;
    const data = await getReviews(id);
    setReviews(data);
  };

  useEffect(() => {
    if (id) {
      syncReviews();
    }
  }, [id]);

  // deletes an review from the API
  async function deleteReview(id) {
    try {
      const response = await fetch(`${API}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete review");
      }

      const deletedReview = await response.json();

      setReviews((prev) =>
        prev.filter((review) => review.id !== deletedReview.id)
      );
      setDeleteErrors((prev) => ({ ...prev, [id]: null }));
    } catch (error) {
      setDeleteErrors((prev) => ({
        ...prev,
        [id]: "You are not authorized to delete this activity.",
      }));

      // clears the delete message after 5 seconds
      setTimeout(() => {
        setDeleteErrors((prev) => ({ ...prev, [id]: null }));
      }, 5000);
    }
  }

  // got this from google ai
  function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );
    return (total / reviews.length).toFixed(2); // two decimal places
  }

  const averageRating = calculateAverageRating(reviews);

  return (
    <>
      <h1>Reviews</h1>
      <p>
        <strong>Average Rating:</strong>&nbsp;
        {averageRating} ⭐
      </p>
      <ReviewList
        reviews={reviews}
        token={token}
        deleteReview={deleteReview}
        deleteErrors={deleteErrors}
      />
      <ReviewForm syncReviews={syncReviews} />
    </>
  );
}
