import React from 'react';

const TeamDiscussions = ({ discussions = [] }) => {
  return (
    <div className="card discussions" style={{marginTop: "20px"}}>
      <h3>Active Discussions</h3>
      {discussions.map((d) => (
        <div key={d.id} className="discussion-card">
          <div className="bubble">
            <div className="discussion-author">{d.author} · <span style={{ color: 'var(--subtle)', fontWeight: 500, fontSize: 12 }}>{d.time}</span></div>
            <div className="discussion-text">{d.text}</div>
            {d.replies && d.replies.map((r) => (
              <div key={r.id} className="reply"><strong>{r.author}:</strong> {r.text}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamDiscussions;
