const API = import.meta.env.VITE_API;

// fetches an array of reviews from the API
export async function getReviews(id) {
  try {
    const response = await fetch(`${API}/items/${id}/reviews`);
    const result = await response.json();
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error fetching reviews", error);
    return [];
  }
}

// Sends an new array to the API to be created

export async function createReview(token, id, review) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
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
    const result = await response.json();
    throw Error(result.message);
  }

  return response.json();
}
