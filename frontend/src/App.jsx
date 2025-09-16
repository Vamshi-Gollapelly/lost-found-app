import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/items")
      .then((r) => r.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 16, lineHeight: 1.5 }}>
      <h1>Lost &amp; Found</h1>
      <p style={{ marginTop: 8 }}>Sprint 1 demo: pulling items from the backend.</p>
      <ul style={{ marginTop: 12 }}>
        {items.map((i) => (
          <li key={i.id}>
            <strong>{i.type.toUpperCase()}</strong>: {i.name} @ {i.location} ({i.date})
          </li>
        ))}
      </ul>
    </main>
  );
}
