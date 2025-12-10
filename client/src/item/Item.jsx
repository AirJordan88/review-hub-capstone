import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiRequest } from "../api/client";

export default function Item() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await apiRequest("/items");
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  if (loading) return <p>Loading items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Item List</h2>
      {token && token !== "null" && token !== "undefined" && (
        <p>
          <Link to="/item/new">+ Create New Item</Link>
        </p>
      )}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {/* Link to the details page for this item */}
            <Link to={`/item/${item.id}`}>
              <strong>{item.title}</strong>
            </Link>{" "}
            — {item.category}
            <p>{item.description}</p>
            <a href={item.url} target="_blank" rel="noreferrer">
              External link
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
