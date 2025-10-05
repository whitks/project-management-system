import React, { useEffect, useState } from 'react';
import './styles/form1component.css';

const blank = {
  team_id: '',
  academic_year: '',
  project_group: '',
  title: '',
  project_track: '',
  brief_intro: '',
  tools_technologies: '',
  modules: []
};

export default function Form1Component({ initialData = null, onSave }) {
  const [form, setForm] = useState(blank);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // prefer explicit initialData, else load from localStorage
    if (initialData) {
      setForm({ ...blank, ...initialData });
    } else {
      try {
        const saved = localStorage.getItem('form1Data');
        if (saved) setForm(JSON.parse(saved));
      } catch (e) { /* ignore */ }
    }
  }, [initialData]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const addModule = () => setForm((f) => ({ ...f, modules: [...(f.modules||[]), { name: '', details: '' }] }));
  const removeModule = (idx) => setForm((f) => ({ ...f, modules: f.modules.filter((_,i)=>i!==idx) }));
  const updateModule = (idx, patch) => setForm((f) => ({ ...f, modules: f.modules.map((m,i)=> i===idx?{...m,...patch}:m) }));

  const validate = () => {
    if (!form.team_id) return 'team_id is required';
    if (!form.academic_year) return 'academic_year is required';
    if (!form.title) return 'title is required';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setMessage(err); return; }
    try {
      localStorage.setItem('form1Data', JSON.stringify(form));
      setMessage('Form 1 saved');
      if (onSave) onSave(form);
    } catch (err) { setMessage('Save failed'); }
  };

  return (
    <div className="card">
      <h3>Form 1 — Project Details</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input placeholder="team_id" value={form.team_id} onChange={(e)=>update({team_id:e.target.value})} />
          <input placeholder="academic_year" value={form.academic_year} onChange={(e)=>update({academic_year:e.target.value})} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input placeholder="project_group" value={form.project_group} onChange={(e)=>update({project_group:e.target.value})} />
          <input placeholder="title" value={form.title} onChange={(e)=>update({title:e.target.value})} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input placeholder="project_track" value={form.project_track} onChange={(e)=>update({project_track:e.target.value})} />
          <input placeholder="tools_technologies (JSON/text)" value={form.tools_technologies} onChange={(e)=>update({tools_technologies:e.target.value})} />
        </div>

        <textarea placeholder="brief_intro" value={form.brief_intro} onChange={(e)=>update({brief_intro:e.target.value})} />

        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontWeight:700 }}>Modules</div>
            <button type="button" className="btn" onClick={addModule}>Add module</button>
          </div>
          <div style={{ display:'grid', gap:8, marginTop:8 }}>
            {(form.modules||[]).map((m, idx) => (
              <div key={idx} style={{ display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:8 }}>
                <input placeholder="module name" value={m.name} onChange={(e)=>updateModule(idx,{name:e.target.value})} />
                <input placeholder="details (JSON/text)" value={m.details} onChange={(e)=>updateModule(idx,{details:e.target.value})} />
                <button type="button" onClick={()=>removeModule(idx)} className="btn" style={{ background:'transparent', color:'var(--danger)' }}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button type="submit" className="btn">Save Form 1</button>
        </div>

        {message && <div style={{ color: message.includes('saved') ? 'var(--primary-color)' : 'var(--danger)' }}>{message}</div>}
      </form>
    </div>
  );
}
