import React from "react";

const LyricList = ({ lyrics, onLikePress }) => {
  return lyrics.length ? (
    <ul style={{ maxWidth: "500px" }}>
      {lyrics.map((item) => (
        <li
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid lightgrey",
            padding: "5px 10px",
          }}
        >
          <div>{item.content}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => onLikePress(item.id, item.likes)}>
              <i className="material-icons">thumb_up</i>
            </button>
            <span style={{ margin: "0 5px" }}>{item.likes}</span>
          </div>
        </li>
      ))}
    </ul>
  ) : null;
};

export default LyricList;
