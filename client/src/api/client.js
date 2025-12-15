const API_URL = import.meta.env.VITE_API ?? "http://localhost:3000";

export async function apiRequest(path, options = {}) {
  // Safely read token from localStorage
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Defensive check: only attach token if it's actually valid
  if (token && token !== "null" && token !== "undefined") {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    data = text; // for token responses or non-JSON errors
  }

  // Centralized error handling
  if (!res.ok) {
    throw new Error(data || "Request failed");
  }

  return data;
}
