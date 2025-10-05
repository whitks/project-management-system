import React, { useEffect, useState } from 'react';
import './components/styles/dashboard.css';

const TeamInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [team, setTeam] = useState(null);
  const [project, setProject] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [members, setMembers] = useState([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      console.log('TeamInfo: fetching team data...');
      try {
        const res = await fetch('http://localhost/another/getTeam.php', { method: 'GET', credentials: 'include' });
        const data = await res.json();
        console.log('TeamInfo: response', data);
        if (!data || data.status !== 'success') {
          setError('Could not load team data');
          setLoading(false);
          return;
        }

        setTeam(data.team || null);
        setProject(data.project || null);
        setMentor(data.mentor || null);
        setMembers(data.members || []);
        setForms(data.forms || []);
      } catch (err) {
        console.error('TeamInfo fetch error', err);
        setError('Failed to fetch team data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // forms progress: count submitted vs total
  const submittedCount = forms.filter(f => f.status === 'submitted' || f.status === 'complete' || f.submitted).length;
  const totalForms = forms.length || 0;
  const formsProgress = totalForms > 0 ? Math.round((submittedCount / totalForms) * 100) : 0;

  if (loading) {
    return (
      <div className="card" style={{ padding: 24 }}>
        <h3>Team</h3>
        <div style={{ color: 'var(--subtle)' }}>Loading team data…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ padding: 24 }}>
        <h3>Team</h3>
        <div style={{ color: 'var(--danger)' }}>{error}</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        <div>
          <div className="card">
            <h3>Team Overview</h3>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{team?.name || `Team ${team?.id || ''}`}</div>
              <div style={{ color: 'var(--subtle)', marginTop: 6 }}>Team ID: {team?.id ?? '—'}</div>
            </div>
            <hr style={{ border: 'none', height: 1, background: 'rgba(15,23,42,0.04)', margin: '14px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Mentor</div>
                {mentor ? (
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: 'linear-gradient(135deg,var(--primary-color),var(--accent-color))' }} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{mentor.name || `${mentor.firstname || ''} ${mentor.lastname || ''}`}</div>
                      <div style={{ color: 'var(--subtle)' }}>{mentor.email}</div>
                    </div>
                  </div>
                ) : <div style={{ color: 'var(--subtle)' }}>No mentor assigned</div>}
              </div>

              <div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Project</div>
                {project ? (
                  <div>
                    <div style={{ fontWeight: 700 }}>{project.project_name || project.title}</div>
                    {project.description && <div style={{ color: 'var(--subtle)', marginTop: 6 }}>{project.description}</div>}
                    {project.status && <div style={{ marginTop: 8 }}><span className="status-dot" style={{ marginRight: 8 }}></span>{project.status}</div>}
                  </div>
                ) : <div style={{ color: 'var(--subtle)' }}>No project assigned</div>}
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <h3>Members</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 12 }}>
              {members && members.length > 0 ? members.map(m => (
                <div key={m.id} className="project-card" style={{ padding: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 10 }}>
                    <div>
                      <div className="project-name" style={{ fontWeight: 700 }}>{m.firstname} {m.lastname}</div>
                      <div style={{ color: 'var(--subtle)', marginTop: 6 }}>{m.email}</div>
                      {m.section && <div style={{ marginTop: 6, fontSize: 13, color: 'var(--subtle)' }}>{m.section}</div>}
                    </div>
                    <div>
                      {m.id === team?.team_lead && <div style={{ background: 'linear-gradient(90deg,var(--primary-color),var(--accent-color))', color: '#fff', padding: '6px 8px', borderRadius: 8, fontWeight: 700 }}>Team Lead</div>}
                    </div>
                  </div>
                </div>
              )) : <div style={{ color: 'var(--subtle)' }}>No members found</div>}
            </div>
          </div>
        </div>

        <aside>
          <div className="card">
            <h3>Forms Summary</h3>
            <div style={{ marginTop: 8 }}>{submittedCount} of {totalForms} forms submitted</div>
            <div className="progress-wrap" style={{ marginTop: 10, ['--progress']: `${formsProgress}%` }}>
              <div className="progress-fill" />
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="btn">Open Forms</button>
            </div>
          </div>

          <div className="card" style={{ marginTop: 12 }}>
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="btn">Invite Member</button>
              <button className="btn" style={{ background: 'linear-gradient(90deg,#f59e0b,#ef4444)' }}>Archive Team</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TeamInfo;
