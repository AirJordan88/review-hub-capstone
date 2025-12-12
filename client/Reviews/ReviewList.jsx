export default function ReviewList({
  reviews,
  token,
  user,
  deleteReview,
  deleteErrors,
}) {
  return (
    <ul id="review-list">
      {reviews.map((review) => {
        return (
          <li id="single-review" key={review.id}>
            <strong>Rating:</strong> {"⭐".repeat(review.rating)}
            <br />
            <strong>Comment:</strong> {review.comment}
            {token && user && review.user_id === user.id && (
              <button onClick={() => deleteReview(review.id)}>Delete</button>
            )}
            {deleteErrors[review.id] && (
              <p style={{ color: "red" }}>{deleteErrors[review.id]}</p>
            )}
            <section>comment button placeholder</section>
          </li>
        );
      })}
    </ul>
  );
}
