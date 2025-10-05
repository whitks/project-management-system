import React, { useMemo, useState, useEffect } from 'react';
import {
  Home,
  User,
  Users,
  CheckSquare,
  FileText,
  BookOpen,
  Settings,
  Bell,
  Search,
  MessageCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import './components/styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import WeeklyForm from './components/WeeklyForm';
import TeamDiscussions from './components/TeamDiscussions';
import Calendar from './components/Calendar';

const TeamDashboard = () => {
  // Example state: team name and project completion
  const [teamName] = useState('Alpha Team');
  const [completion, setCompletion] = useState(64); // percent
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [LatestWeek, setLatestWeek] = useState(null);
  const [weeklyForms, setWeeklyForms] = useState([]);

  const [selectedWeek, setSelectedWeek] = useState(null);
  const [formData, setFormData] = useState({ functionality: '', progress: 0, nextGoals: '', tasks: [] });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch latest week from backend
    fetch("http://localhost/another/getLatestWeek.php", { method: "GET", credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') setLatestWeek(data.latestWeek);
      })
      .catch(err => console.error(err));
  }, []);

  const openWeek = async (week) => {
    // fetch weekly form from backend and prefill the WeeklyForm modal
    setFormLoading(true);
    setFormError(null);
    // determine week number
    const wkNum = week.week ?? week.id ?? Number((week.title || '').match(/\d+/)?.[0]);
    try {
      const res = await fetch(`http://localhost/another/getWeeklyForm.php?week=${wkNum}`, { method: 'GET', credentials: 'include' });
      const data = await res.json();
      console.log('Fetched weekly form for week', wkNum, data);
      if (data && data.status === 'success' && data.form) {
        // map backend fields to WeeklyForm fields
        console.log("yes")
        const map = {
          week: wkNum,
          module_name: data.form.module_name || "",
          functionality_done: data.form.functionality_done || "",
          issues: data.form.issues || "",
          progress: data.form.progress || 0
        };
        setFormData(map);
      } else {
        // not found - open blank form
        setFormData({ functionality: '', progress: 0, nextGoals: '', tasks: [] });
      }
    } catch (err) {
      console.error('Error fetching form:', err);
      setFormError('Failed to load form');
      setFormData({ functionality: '', progress: 0, nextGoals: '', tasks: [] });
    } finally {
      setFormLoading(false);
      setSelectedWeek(week);
    }
  };
  const closeWeek = () => setSelectedWeek(null);

  // Discussions and timeline sample data
  const discussions = useMemo(() => [
    { id: 1, author: 'Mentor Jane', text: 'Nice progress on auth flow. Consider unit tests.', time: '2h ago', replies: [{ id: 11, author: 'Dev Sam', text: 'Thanks! Will add tests this week.' }] },
    { id: 2, author: 'Mentor Kyle', text: 'Can we update the wireframes for the settings page?', time: '1d ago', replies: [] }
  ], []);

  const timeline = useMemo(() => [
    { id: 1, time: 'Today', text: 'Merged feature/login into main' },
    { id: 2, time: 'Yesterday', text: 'Deployed staging build 1.2.0' },
    { id: 3, time: 'Aug 10', text: 'Sprint planning completed' }
  ], []);

  // Calendar state
  const [current, setCurrent] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const startOfMonth = new Date(current.getFullYear(), current.getMonth(), 1);
  const endOfMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0);

  const days = [];
  // prepend empty days until start weekday
  const startWeekday = startOfMonth.getDay();
  for (let i = 0; i < startWeekday; i++) days.push(null);
  for (let d = 1; d <= endOfMonth.getDate(); d++) days.push(new Date(current.getFullYear(), current.getMonth(), d));

  const prevMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  const nextMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));

  useEffect(() => {
    // small illustrative effect to show progress change over time
    const t = setTimeout(() => setCompletion((c) => Math.min(88, c + 2)), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar" aria-hidden={false}>
        <div className="sidebar-brand">
          <div className="brand-logo" />
          <div className="brand-name">PM System</div>
        </div>

        <nav className="nav-list" aria-label="Primary">
          <div className="nav-item"><div className="icon"><Home /></div><div className="label">Dashboard</div></div>
          <div className="nav-item" onClick={() => navigate('/team')}><div className="icon"><Users /></div><div className="label">Team</div></div>
          <div className="nav-item"><div className="icon"><CheckSquare /></div><div className="label">Tasks</div></div>
          <div className="nav-item" onClick={() => navigate('/forms')}><div className="icon"><FileText /></div><div className="label">Forms</div></div>
          <div className="nav-item"><div className="icon"><BookOpen /></div><div className="label">Mentors</div></div>
          <div className="nav-item"><div className="icon"><Settings /></div><div className="label">Settings</div></div>
        </nav>
      </aside>

      {/* Main Window */}
      <main className="dashboard-main">
        {/* Topbar */}
        <div className="dashboard-topbar">
          <div className="topbar-left">
            <div className="search">
              <Search />
              <input placeholder="Search tasks, forms, mentors..." aria-label="Search" />
            </div>
          </div>

          <div className="topbar-actions">
            <button className="action-btn" aria-label="Notifications"><Bell /></button>
            <button className="action-btn" aria-label="Messages"><MessageCircle /></button>
            <div className="profile">
              <div className="avatar" aria-hidden="true" />
              <div className="username">{teamName}</div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="dashboard-grid">
          <section>
            <div className="card welcome" style={{ marginBottom: 12 }}>
              <div className="welcome-left">
                <div className="team-info">
                  <div className="greeting">Welcome back</div>
                  <div className="team-name">{teamName} — Project Alpha</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="progress-wrap" style={{ ['--progress']: `${completion}%` }}>
                  <div className="progress-fill" />
                </div>
                <div className="progress-meta">{completion}% complete</div>
              </div>
            </div>

            {/* Weekly Forms */}
            <div className="card">
              <h3>Weekly Forms — Form 3</h3>
              <p style={{ color: 'var(--subtle)', marginTop: 6 }}>
                Weekly check-ins to measure incremental project progress.
              </p>
              <div className="weekly-forms" style={{ marginTop: 12 }}>
                {LatestWeek ? Array.from({ length: LatestWeek }, (_, i) => {
                  const wkNum = i + 1;
                  const existing = weeklyForms.find(w => w.id === wkNum) || { id: wkNum, title: `Week ${wkNum}`, status: wkNum < LatestWeek ? 'complete' : 'pending' };
                  return (
                    <div key={existing.id} className="form-card card">
                      <div className="form-card-header">
                        <div className="status-wrap"><div className={`status-dot status--${existing.status}`} /></div>
                        <div className="form-card-meta">
                          <div className="title">{existing.title}</div>
                          <div className="sub">{existing.status === 'complete' ? 'Submitted' : 'Not submitted'}</div>
                        </div>
                        <div className="form-card-actions">
                          <button className="btn" onClick={() => openWeek(existing)}>Open</button>
                        </div>
                      </div>
                    </div>
                  )
                }) : <div>Loading...</div>}
              </div>
            </div>

            {/* Active Discussions */}
            <TeamDiscussions discussions={discussions} />
          </section>

          <aside>
            <Calendar current={current} prevMonth={prevMonth} nextMonth={nextMonth} days={days} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />

            <div className="card" style={{ marginTop: 12 }}>
              <h3>Team Activity</h3>
              <div className="timeline">
                {timeline.map(it => (
                  <div className="timeline-item" key={it.id}>
                    <div className="time">{it.time}</div>
                    <div className="content">{it.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ marginTop: 12 }}>
              <h3>Forms (Monthly & Yearly)</h3>
              <p style={{ color: 'var(--subtle)' }}>Form 1 — Monthly overview • Form 2 — Yearly summary</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button className="btn" style={{ background: 'linear-gradient(90deg,var(--primary-color),var(--accent-color))' }} onClick={() => navigate('/forms')}>Open Form 1</button>
                <button className="btn" style={{ background: 'linear-gradient(90deg,#f59e0b,#ef4444)' }} onClick={() => navigate('/forms')}>Open Form 2</button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {formLoading && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal" style={{ padding: 20 }}>
            <div style={{ fontWeight: 700 }}>Loading form…</div>
            <div style={{ color: 'var(--subtle)', marginTop: 8 }}>Fetching saved data for the selected week.</div>
          </div>
        </div>
      )}

      {selectedWeek && !formLoading && (
        <WeeklyForm week={selectedWeek} initial={formData} onClose={closeWeek} />
      )}
    </div>
  );
};

export default TeamDashboard;
