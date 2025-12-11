import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiRequest } from "../api/client";
import "./item.css"; // ✅ import the styles

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
    <div id="item-page">
      <h2>Item List</h2>

      {token && token !== "null" && token !== "undefined" && (
        <p>
          <Link id="create-item-btn" to="/item/new">
            + Create New Item
          </Link>
        </p>
      )}

      <ul id="item-list">
        {items.map((item) => (
          <li key={item.id} className="item-card">
            {/* Link to the details page for this item */}
            <Link className="title-link" to={`/item/${item.id}`}>
              <strong>{item.title}</strong>
            </Link>{" "}
            <p className="item-category">{item.category}</p>
            <p className="item-description">{item.description}</p>
            <a
              className="external-link"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            ></a>
          </li>
        ))}
      </ul>
    </div>
  );
}
