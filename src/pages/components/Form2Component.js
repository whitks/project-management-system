import React, { useEffect, useState } from 'react';
import './styles/form2component.css';

const blank = {
  team_id: '',
  team_member_id: '',
  academic_year: '',
  title: '',
  module_name: '',
  functionality_name: '',
  soft_deadline: '',
  hard_deadline: '',
  details: ''
};

export default function Form2Component({ initialData = null, onSave }) {
  const [rows, setRows] = useState([blank]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      setRows(initialData);
    } else {
      try {
        const saved = localStorage.getItem('form2Data');
        if (saved) setRows(JSON.parse(saved));
      } catch (e) {}
    }
  }, [initialData]);

  const updateRow = (i, patch) => setRows(r => r.map((row, idx) => idx===i?{...row,...patch}:row));
  const addRow = () => setRows(r => [...r, {...blank}]);
  const removeRow = (i) => setRows(r => r.filter((_,idx)=>idx!==i));

  const validate = () => {
    for (let i=0;i<rows.length;i++) {
      const r = rows[i];
      if (!r.team_id || !r.team_member_id || !r.module_name) return `Row ${i+1}: team_id, team_member_id and module_name required`;
      if (r.soft_deadline && r.hard_deadline && new Date(r.soft_deadline) > new Date(r.hard_deadline)) return `Row ${i+1}: soft_deadline must be <= hard_deadline`;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setMessage(err); return; }
    try {
      localStorage.setItem('form2Data', JSON.stringify(rows));
      setMessage('Form 2 saved');
      if (onSave) onSave(rows);
    } catch (e) { setMessage('Save failed'); }
  };

  return (
    <div className="card">
      <h3>Form 2 — Module / Functionality assignments</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontWeight:700 }}>Assignments</div>
            <button type="button" className="btn" onClick={addRow}>Add assignment</button>
          </div>
          <div style={{ display:'grid', gap:8, marginTop:12 }}>
            {rows.map((r, idx) => (
              <div key={idx} style={{ display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap:8, alignItems:'start' }}>
                <input placeholder="team_id" value={r.team_id} onChange={e=>updateRow(idx,{team_id:e.target.value})} />
                <input placeholder="team_member_id" value={r.team_member_id} onChange={e=>updateRow(idx,{team_member_id:e.target.value})} />
                <input placeholder="academic_year" value={r.academic_year} onChange={e=>updateRow(idx,{academic_year:e.target.value})} />
                <input placeholder="title" value={r.title} onChange={e=>updateRow(idx,{title:e.target.value})} />
                <input placeholder="module_name" value={r.module_name} onChange={e=>updateRow(idx,{module_name:e.target.value})} />
                <input placeholder="functionality_name" value={r.functionality_name} onChange={e=>updateRow(idx,{functionality_name:e.target.value})} />
                <input type="date" placeholder="soft_deadline" value={r.soft_deadline} onChange={e=>updateRow(idx,{soft_deadline:e.target.value})} />
                <input type="date" placeholder="hard_deadline" value={r.hard_deadline} onChange={e=>updateRow(idx,{hard_deadline:e.target.value})} />
                <input placeholder="details" value={r.details} onChange={e=>updateRow(idx,{details:e.target.value})} />
                <div><button type="button" className="btn" style={{ background:'transparent', color:'var(--danger)' }} onClick={()=>removeRow(idx)}>Remove</button></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <button type="submit" className="btn">Save Form 2</button>
        </div>
        {message && <div style={{ color: message.includes('saved') ? 'var(--primary-color)' : 'var(--danger)' }}>{message}</div>}
      </form>
    </div>
  );
}
