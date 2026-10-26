import React from "react";

export default function CategoryTabs({ categories, active, onSelect }) {
  return (
    <nav className="tabs">
      {categories.map((c) => (
        <button
          key={c}
          className={`tab ${c === active ? "tab-active" : ""}`}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </nav>
  );
}
