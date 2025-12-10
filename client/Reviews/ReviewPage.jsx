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

  useEffect(() => {
    if (id) {
      syncReviews();
    }
  }, [id]);

  const syncReviews = async () => {
    const data = await getReviews(id);
    setReviews(data);
  };

  useEffect(() => {
    syncReviews();
  }, []);

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
        const text = await response.text();
        throw new Error(text);
      }

      const result = null;
      if (response.status !== 204) {
        result = await response.json();
      }

      setReviews((prev) => prev.filter((review) => review.id !== Number(id)));
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

  console.log("Fetched reviews:", reviews);

  return (
    <>
      <h1>Reviews</h1>
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
