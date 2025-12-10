export default function ReviewList({
  reviews,
  token,
  deleteReview,
  deleteErrors,
}) {
  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <strong>Rating:</strong> {"⭐".repeat(review.rating)}
          <br />
          <strong>Comment:</strong> {review.comment}
          {token && (
            <button onClick={() => deleteReview(review.id)}>Delete</button>
          )}
          {deleteErrors[review.id] && (
            <p style={{ color: "red" }}>{deleteReview[review.id]}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
