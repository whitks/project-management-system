import React, { useState } from 'react';
import { Home, User } from 'lucide-react';
import './components/styles/dashboard.css'; // import your CSS file

const TeamDashboard = () => {
  const [activeWeek, setActiveWeek] = useState(null);
  const [formData, setFormData] = useState({
    functionality: '',
    progress: '',
    details: ''
  });

  const weeks = ['Week 1', 'Week 2', 'Week 3'];

  const openWeek = (week) => setActiveWeek(week);
  const closeModal = () => {
    setActiveWeek(null);
    setFormData({ functionality: '', progress: '', details: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/save_week_data.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ week: activeWeek, ...formData })
    });
    closeModal();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}


      {/* Main Window */}
      <div className="dashboard-main">
        {/* Navbar */}
        <div className="dashboard-navbar">
          <Home className="dashboard-icon" />
          <User className="dashboard-icon" />
        </div>

        {/* Week Cards */}
        <div className="dashboard-week-cards">
          {weeks.map((week) => (
            <div
              key={week}
              className="dashboard-week-card"
              onClick={() => openWeek(week)}
            >
              <h3>{week}</h3>
            </div>
          ))}
        </div>

        {/* Modal */}
        {activeWeek && (
          <div className="dashboard-modal-overlay">
            <div className="dashboard-modal">
              <h2>{activeWeek} - Add Progress</h2>
              <form onSubmit={handleSubmit} className="dashboard-form">
                <div className="dashboard-form-group">
                  <label>Name of Functionality</label>
                  <input
                    type="text"
                    name="functionality"
                    value={formData.functionality}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="dashboard-form-group">
                  <label>Progress Achieved (%)</label>
                  <input
                    type="number"
                    name="progress"
                    value={formData.progress}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                </div>
                <div className="dashboard-form-group">
                  <label>Details of Task Completed</label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="dashboard-form-actions">
                  <button type="button" onClick={closeModal}>Cancel</button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDashboard;
