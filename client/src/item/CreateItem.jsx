import { useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "../api/client";
import "./CreateItem.css";

export default function CreateItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      navigate(`/item/${newItem.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="create-item-page">
      <div id="create-item-card">
        <h2 id="create-item-title">Create New Item</h2>

        {error && <p className="create-item-error">{error}</p>}

        <form id="create-item-form" onSubmit={handleSubmit}>
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
            rows={4}
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

          <button id="create-item-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
