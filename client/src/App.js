import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://job-trackerii.onrender.com/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAuth = async () => {
    try {
      setError('');
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
      const payload = authMode === 'login' ? { email, password } : { name, email, password };
      const res = await axios.post(`${API}${endpoint}`, payload);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const addJob = async () => {
    if (!company || !position) return;
    await axios.post(`${API}/jobs`, { company, position, status, location, notes }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCompany(''); setPosition(''); setLocation(''); setNotes('');
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await axios.delete(`${API}/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchJobs();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setJobs([]);
  };

  if (!token) {
    return (
      <div style={{ maxWidth: '400px', margin: '80px auto', fontFamily: 'Arial', padding: '20px' }}>
        <h1>Job Tracker</h1>
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2>{authMode === 'login' ? 'Login' : 'Register'}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {authMode === 'register' && (
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}
              style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
          )}
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
          <button onClick={handleAuth}
            style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '8px' }}>
            {authMode === 'login' ? 'Login' : 'Register'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '15px' }}>
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              style={{ color: '#007bff', cursor: 'pointer' }}>
              {authMode === 'login' ? 'Register' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Job Application Tracker</h1>
        <button onClick={logout}
          style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>Add New Application</h2>
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)}
          style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
        <input placeholder="Position" value={position} onChange={e => setPosition(e.target.value)}
          style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)}
          style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
        <select value={status} onChange={e => setStatus(e.target.value)}
          style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <textarea placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)}
          style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }} />
        <button onClick={addJob}
          style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Application
        </button>
      </div>

      <h2>My Applications ({jobs.length})</h2>
      {jobs.map(job => (
        <div key={job.id} style={{ background: 'white', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
          <h3>{job.position} at {job.company}</h3>
          <p>Status: <strong>{job.status}</strong></p>
          {job.location && <p>Location: {job.location}</p>}
          {job.notes && <p>Notes: {job.notes}</p>}
          <button onClick={() => deleteJob(job.id)}
            style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;