import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/jobs');
    setJobs(res.data);
  };

  const addJob = async () => {
    if (!company || !position) return;
    await axios.post('http://localhost:5000/api/jobs', {
      company, position, status, location, notes
    });
    setCompany(''); setPosition(''); setLocation(''); setNotes('');
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Job Application Tracker</h1>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>Add New Application</h2>
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
        <input placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
        <select value={status} onChange={e => setStatus(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <textarea placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
        <button onClick={addJob} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Application</button>
      </div>

      <h2>My Applications ({jobs.length})</h2>
      {jobs.map(job => (
        <div key={job.id} style={{ background: 'white', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
          <h3>{job.position} at {job.company}</h3>
          <p>Status: <strong>{job.status}</strong></p>
          {job.location && <p>Location: {job.location}</p>}
          {job.notes && <p>Notes: {job.notes}</p>}
          <button onClick={() => deleteJob(job.id)} style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;