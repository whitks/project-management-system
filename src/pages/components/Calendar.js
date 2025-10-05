import React from 'react';

const Calendar = ({ current, prevMonth, nextMonth, days, setSelectedDate, selectedDate }) => {
  return (
    <div className="card calendar-card">
      <h3>Calendar</h3>

      <div className="calendar-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={prevMonth} aria-label="Previous month">◀</button>
          <button className="btn" onClick={nextMonth} aria-label="Next month">▶</button>
        </div>
        <div style={{ fontWeight: 700 }}>{current.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
      </div>

      <div className="calendar-weekdays" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 8, color: 'var(--subtle)', fontSize: 12 }}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => <div key={d} style={{ textAlign: 'center' }}>{d}</div>)}
      </div>

      <div className="calendar-days" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {days.map((dt, idx) => (
          <div key={idx}
               onClick={() => dt && setSelectedDate(dt)}
               className={`calendar-day ${dt ? 'clickable' : 'empty'}`}
               style={{ minHeight: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: dt ? (selectedDate && dt.toDateString() === selectedDate.toDateString() ? 'linear-gradient(90deg,var(--primary-color),var(--accent-color))' : '#fff') : 'transparent', boxShadow: dt ? 'var(--shadow)' : 'none', cursor: dt ? 'pointer' : 'default', color: dt ? (selectedDate && dt.toDateString() === selectedDate.toDateString() ? '#fff' : 'inherit') : 'inherit' }}>
            {dt ? dt.getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
