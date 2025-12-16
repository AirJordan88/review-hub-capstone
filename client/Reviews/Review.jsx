const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// Fetches an array of reviews from the API for a given item
export async function getReviews(id) {
  try {
    const response = await fetch(`${API}/items/${id}/reviews`);

    if (!response.ok) {
      console.error("Failed to fetch reviews, status:", response.status);
      return [];
    }

    const result = await response.json();
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error fetching reviews", error);
    return [];
  }
}

// Sends a new review to the API to be created
export async function createReview(token, id, review) {
  if (!token) {
    throw Error("You must be signed in to create a review.");
  }

  const response = await fetch(`${API}/items/${id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw Error(result.message || "Failed to create review.");
  }

  return response.json();
}
