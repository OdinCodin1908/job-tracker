require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');

app.use('/api/jobs', jobsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Job Tracker API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});