const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Explicit health check endpoint for Elastic Beanstalk
app.get('/', (req, res) => {
  res.status(200).send('OK'); // Simple response for health check
});

// Catch-all route for SPA (single-page app) serving index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Use port 8080 explicitly (matches your logs), or environment variable if set
const port = process.env.PORT || 8080;

// Listen on all interfaces (0.0.0.0) instead of localhost
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});