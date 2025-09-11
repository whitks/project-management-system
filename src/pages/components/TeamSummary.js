// components/TeamSummary.js
export default function TeamSummary({ team, project, mentor, approvals }) {
  return (
    <div className="team-summary">
      <h2>Team Summary</h2>

      <div className="summary-card">
        <h3>Team Members</h3>
        <ul>
          <li>You (Team Lead)</li>
          {team && team.length > 0 ? (
            team.map((member, index) => {
              const statusKey = `member${index + 1}`;
              const isApproved = approvals?.[statusKey] === 0; // 0 means approved
              return (
                <li key={member.email || index}>
                  {member.firstname} {member.lastname} ({member.email}) -{" "}
                  {isApproved ? "✅ Approved" : "⏳ Pending"}
                </li>
              );
            })
          ) : (
            <li>No members added</li>
          )}
        </ul>
      </div>

      <div className="summary-card">
        <h3>Project</h3>
        <p>{project?.project_name || "No project selected"}</p>
      </div>

      <div className="summary-card">
        <h3>Mentor</h3>
        <p>
          {mentor
            ? `${mentor.firstname} ${mentor.lastname} - ${
                approvals?.mentor === 0 ? "✅ Approved" : "⏳ Pending"
              }`
            : "No mentor selected"}
        </p>
      </div>
    </div>
  );
}
