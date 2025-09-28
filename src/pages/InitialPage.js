import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Become from "./components/Become";
import NavBar from "./components/NavBar";
import SelectTeam from "./components/SelectTeam";
import "./components/styles/initialpage.css";
import "react-step-progress-bar/styles.css";
import SelectProject from "./components/SelectProject";
import SelectMentor from "./components/SelectMentor";
import TeamSummary from "./components/TeamSummary";
import TeamInvites from "./components/TeamInvites";

function InitialPage() {
  const navigate = useNavigate();
  const [currPoint, setCurrPoint] = useState(1);
  const [team, setTeam] = useState([]); // Array of members (excluding lead)
  const [project, setProject] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [approvals, setApprovals] = useState({});
  const [flag, setFlag] = useState(false);

useEffect(() => {
  if (currPoint === 5 && project && mentor && team.length >= 3 && !flag) {
    const sendTeam = async () => {
      try {
        const res = await fetch("http://localhost/another/addteam.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            team: {
              team_member_1: team[0].id,
              team_member_2: team[1].id,
              team_member_3: team[2].id,
              project_id: project.id,
              mentor_id: mentor.mentor_id,
            },
          }),
          credentials: "include",
        });

        const data = await res.json();

        if (data.status === "success") {
          setFlag(true);
          setTeamId(data.team_id);
          console.log("Team created successfully, checking approvals...");

          const interval = setInterval(async () => {
            try {
              const res2 = await fetch(
                "http://localhost/another/checkapprovals.php",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ team_id: data.team_id }),
                  credentials: "include",
                }
              );

              const approvalData = await res2.json();

              if (approvalData.status === "success") {
                // Map members into approvals object dynamically
                const newApprovals = {};
                approvalData.members.forEach((m, idx) => {
                  newApprovals[`member${idx + 1}`] = m.approval_status;
                });

                // Lead is always approved
                newApprovals.lead = 0;

                // Mentor approval status
                newApprovals.mentor = approvalData.mentor ? 1 : 0; // adjust if mentor approval exists separately

                setApprovals(newApprovals);

                // Check for pending approvals
                const pending = Object.keys(newApprovals).filter(
                  (key) => newApprovals[key] === 1
                );

                if (pending.length === 0) {
                  clearInterval(interval);
                  navigate('/dashboard');
                } else {
                  console.log("Pending approvals:", pending);
                }
              }
            } catch (err) {
              console.error("Error fetching approvals:", err);
            }
          }, 10000);
        } else {
          alert("Error creating team: " + JSON.stringify(data));
          console.log(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    sendTeam();
  }
}, [currPoint, project, mentor, team, flag]);


  return (
    <div className="initials-container">
      {currPoint === -1 && <TeamInvites setCurrPoint={setCurrPoint} />}
      {currPoint === 1 && <Become setCurrPoint={setCurrPoint} />}
      {currPoint === 2 && (
        <SelectTeam setCurrPoint={setCurrPoint} team={team} setTeam={setTeam} />
      )}
      {currPoint === 3 && (
        <SelectProject setCurrPoint={setCurrPoint} setProject={setProject} />
      )}
      {currPoint === 4 && (
        <SelectMentor setCurrPoint={setCurrPoint} setMentor={setMentor} />
      )}
      {currPoint === 5 && (
        <TeamSummary
          team={team}
          project={project}
          mentor={mentor}
          approvals={approvals}
          leadName={team[0]?.leadName || "You"} // pass lead name if needed
        />
      )}
      {currPoint === 6 && (
        <div className="success-message">
          <h2>Team Approved!</h2>
          <p>Your team has been successfully created and approved.</p>
        </div>
      )}
    </div>
  );
}

export default InitialPage;
