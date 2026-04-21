const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
const jobsRouter = require('./routes/jobs');
app.use('/api/jobs', jobsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Job Tracker API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
