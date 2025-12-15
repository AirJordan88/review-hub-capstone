import { useState } from "react";
import { apiRequest } from "../api/client";
import "../index.css";

export default function ItemSearch({ setItems, allItems }) {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [resultsFound, setResultsFound] = useState(true);

  async function handleSearch() {
    try {
      // 1. Fetch all items from your API
      const data = await apiRequest("/items");

      const allItems = Array.isArray(data) ? data : data.items;

      if (!Array.isArray(allItems)) {
        throw new Error("Unexpected API format — expected an array of items.");
      }

      // 2. Client-side filtering
      const filteredItems = allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      // 3. Update parent state
      setItems(filteredItems);
      setSearched(true);
      setResultsFound(filteredItems.length > 0);
    } catch (err) {
      console.error("Item search failed:", err);
      alert("Failed to search items. Please try again.");
    }
  }

  function handleReset() {
    console.log("RESET allItems length:", allItems?.length);
    console.log("RESET allItems sample:", allItems?.slice?.(0, 2));
    setQuery("");
    setSearched(false);
    setResultsFound(true);
    setItems(allItems);
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="catalog-search">
        <input
          type="text"
          placeholder="Search restaurants, movies, games…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* No results message */}
      {searched && !resultsFound && (
        <p className="no-results-message">No items found matching "{query}".</p>
      )}

      {/* Reset button */}
      {searched && (
        <div className="back-to-books-container">
          <button onClick={handleReset}>View All Items</button>
        </div>
      )}
    </div>
  );
}
