import React, { useEffect, useState } from 'react';
import './pages.css';
import Form1Component from './components/Form1Component';
import Form2Component from './components/Form2Component';

export default function ProjectFormsPage() {
  const [form1, setForm1] = useState(null);
  const [form2, setForm2] = useState(null);

  useEffect(()=>{
    try {
      const a = localStorage.getItem('form1Data');
      const b = localStorage.getItem('form2Data');
      if (a) setForm1(JSON.parse(a));
      if (b) setForm2(JSON.parse(b));
    } catch(e){}
  },[]);

  return (
    <div className="page page-forms">
      <h2>Project Forms</h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <div>
          <Form1Component initialData={form1} onSave={(d)=>{ setForm1(d); localStorage.setItem('form1Data', JSON.stringify(d)); }} />
        </div>
        <div>
          <Form2Component initialData={form2} onSave={(d)=>{ setForm2(d); localStorage.setItem('form2Data', JSON.stringify(d)); }} />
        </div>
      </div>
    </div>
  );
}
