import { useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "../api/client";

export default function CreateItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Token protection — MUST be inside the function
  const token = localStorage.getItem("token");

  if (!token || token === "null" || token === "undefined") {
    return <p>You must be logged in to create an item.</p>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const newItem = await apiRequest("/items", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          category,
          url,
        }),
      });

      // ✅ Redirect to the new item's detail page
      navigate(`/item/${newItem.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Create New Item</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          placeholder="External URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Item"}
        </button>
      </form>
    </div>
  );
}
