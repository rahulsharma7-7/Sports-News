import React from "react";

function timeAgo(iso) {
  if (!iso) return "";
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

export default function NewsGrid({ articles, loading, error }) {
  if (error) {
    return (
      <p className="status-msg status-error">
        Couldn't load headlines ({error}). Try refreshing.
      </p>
    );
  }
  if (loading && !articles.length) {
    return <p className="status-msg">Loading the latest headlines…</p>;
  }
  if (!articles.length) {
    return <p className="status-msg">No headlines right now. Check back soon.</p>;
  }

  return (
    <section className="news-grid">
      {articles.map((a) => (
        <article key={a.id} className="card">
          {a.image && (
            <img
              className="card-img"
              src={a.image}
              alt=""
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
          <div className="card-body">
            <div className="card-meta">
              <span>{a.source}</span>
              <span>{timeAgo(a.publishedAt)}</span>
            </div>
            <h2 className="card-title">
              <a href={a.url} target="_blank" rel="noopener noreferrer">
                {a.title}
              </a>
            </h2>
            {a.description && <p className="card-desc">{a.description}</p>}
          </div>
        </article>
      ))}
    </section>
  );
}
