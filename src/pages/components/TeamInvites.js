import { useEffect, useState } from "react";
import "./styles/initialpage.css"; // reuses hero section theme

function TeamInvites({ setCurrPoint }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
        console.log("YES")
      try {
        const res = await fetch("https://prback.ct.ws/another/whowantsme.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.status === "success") {
          setRequests(data.teams || []);
        }
      } catch (err) {
        console.error("Error fetching invites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (team_id) => {
    try {
      const res = await fetch("https://prback.ct.ws/another/approveteam.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_id }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.status === "success") {
        setRequests((prev) => prev.filter((r) => r.team_id !== team_id));
      } else {
        alert("Error approving: " + data.message);
      }
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  if (loading) return <p>Loading your team invites...</p>;

  return (
    <div className="herosection">
      <div className="herosection-content">
        <h1 id="main-text">Your Invitations</h1>
        <p>These teams want you to join. Approve below 👇</p>

        {requests.length === 0 ? (
          <p>No pending invites</p>
        ) : (
          requests.map((req) => (
            <div
              key={req.team_id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "15px",
                padding: "20px",
                marginTop: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>
                👤 Team Lead: {req.team_lead.name}
              </h2>
              <p>
                <b>Project:</b> {req.project.title}
              </p>
              <p>
                <b>Mentor:</b> {req.mentor.name}
              </p>
              <button onClick={() => handleApprove(req.team_id)}>
                Approve ✅
              </button>
            </div>
          ))
        )}

        <button
          style={{ marginTop: "40px" }}
          onClick={() => setCurrPoint(1)} // back to become page
        >
          Back ↩️
        </button>
      </div>
    </div>
  );
}

export default TeamInvites;
