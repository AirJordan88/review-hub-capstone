import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiRequest } from "../api/client";
import ItemSearch from "./ItemSearch";
import "./item.css";

export default function Item() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await apiRequest("/items");
        setItems(data);
        setAllItems(data);
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
      <h2>Welcome to ReviewHub</h2>

      <ItemSearch setItems={setItems} allItems={allItems} />

      {token && token !== "null" && token !== "undefined" && (
        <p>
          <Link id="create-item-btn" to="/item/new">
            + Create New Item
          </Link>
        </p>
      )}

      <ul id="item-list">
        {items.map((item) => (
          <li key={item.id}>
            {/* ✅ Wrap the whole card in the Link */}
            <Link to={`/item/${item.id}`} className="item-card-link">
              <div className="item-card">
                <strong className="item-title">{item.title}</strong>
                <p className="item-category">{item.category}</p>
                <p className="item-description">{item.description}</p>

                {/* Optional: make this NOT navigate away when clicked */}
                <a
                  className="external-link"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.url}
                </a>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
