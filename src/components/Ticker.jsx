import React from "react";

export default function Ticker({ headlines }) {
  if (!headlines.length) return null;
  // Duplicate the list so the scroll loops seamlessly.
  const items = [...headlines, ...headlines];
  return (
    <div className="ticker" aria-label="Latest headlines">
      <span className="ticker-label">WIRE</span>
      <div className="ticker-track">
        <div className="ticker-inner">
          {items.map((a, i) => (
            <a key={`${a.id}-${i}`} href={a.url} target="_blank" rel="noopener noreferrer">
              {a.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
