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
          {review.name}
          {token && (
            <button onClick={() => deleteReview(reviews.id)}>Delete</button>
          )}
          {deleteErrors[review.id] && (
            <p style={{ color: "red" }}>{deleteReview[reviews.id]}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
