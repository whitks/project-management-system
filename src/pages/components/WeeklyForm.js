import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles/weeklyform.css";

const WeeklyForm = ({ initial = {}, onClose }) => {
  const teamId = useSelector((state) => state.user.team.id);
  const userId = useSelector((state) => state.user.user.id);

  const [week, setWeek] = useState(initial.week ?? "");
  const [moduleName, setModuleName] = useState(initial.module_name ?? "");
  const [functionalityDone, setFunctionalityDone] = useState(initial.functionality_done ?? "");
  const [issues, setIssues] = useState(initial.issues ?? "");
  const [progress, setProgress] = useState(initial.progress ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ NEW: Update form when parent sends new "initial" data
  useEffect(() => {
    if (initial) {
      setWeek(initial.week ?? "");
      setModuleName(initial.module_name ?? "");
      setFunctionalityDone(initial.functionality_done ?? "");
      setIssues(initial.issues ?? "");
      setProgress(initial.progress ?? "");
    }
  }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!week.trim() || !moduleName.trim() || !functionalityDone.trim()) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    const payload = {
      team_id: teamId,
      form_type: "form3",
      week,
      module_name: moduleName,
      functionality_done: functionalityDone,
      issues,
      progress: Number(progress) || 0,
    };

    try {
      const res = await fetch("https:/prback.ct.ws/another/handleforms.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      console.log("Raw response:", text);

      try {
        const data = JSON.parse(text);
        if (data.status === "success") {
          alert(`Form ${data.action} successfully!`);
          onClose();
        } else {
          setError(data.message || "Failed to save form.");
        }
      } catch {
        setError("Invalid response from server. Check console for details.");
      }
    } catch (err) {
      console.error(err);
      setError("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-modal-overlay">
      <div className="dashboard-modal weekly-modal">
        <h2>Weekly Form — Submit Report</h2>
        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div className="dashboard-form-group">
            <label>Week</label>
            <input
              type="text"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              placeholder="e.g., Week 1"
              required
            />

            <label>Module / Project Name</label>
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="Module name"
              required
            />

            <label>Functionality Done</label>
            <textarea
              value={functionalityDone}
              onChange={(e) => setFunctionalityDone(e.target.value)}
              placeholder="Describe the work done this week"
              required
            />

            <label>Issues / Remarks</label>
            <textarea
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
              placeholder="Any blockers or remarks"
            />

            <label>Progress (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              placeholder="Progress in %"
            />
          </div>

          <div className="dashboard-form-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

          {error && <p className="form-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default WeeklyForm;
