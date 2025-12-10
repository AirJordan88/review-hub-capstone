const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
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
    data = text; // for token responses from /users/login
  }

  if (!res.ok) {
    throw new Error(data || "Request failed");
  }

  return data;
}
