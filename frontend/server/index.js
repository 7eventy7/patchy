const express = require('express');
const Docker = require('dockerode');
const cors = require('cors');

const app = express();
const port = process.env.API_PORT || 11778;

// Initialize Docker
const docker = new Docker({
  socketPath: process.env.DOCKER_SOCKET || '/var/run/docker.sock'
});

app.use(cors());
app.use(express.json());

// List all containers
app.get('/api/containers', async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    const formattedContainers = containers.map(container => ({
      id: container.Id,
      name: container.Names[0].replace(/^\//, ''),
      image: container.Image,
      state: container.State,
      status: container.Status,
      created: new Date(container.Created * 1000).toISOString()
    }));
    res.json(formattedContainers);
  } catch (error) {
    console.error('Error listing containers:', error);
    res.status(500).json({ error: 'Failed to list containers' });
  }
});

// Get container logs
app.get('/api/containers/:id/logs', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    const logs = await container.logs({
      stdout: true,
      stderr: true,
      tail: 100,
      timestamps: true
    });
    res.send(logs.toString());
  } catch (error) {
    console.error('Error getting container logs:', error);
    res.status(500).json({ error: 'Failed to get container logs' });
  }
});

// Get container details
app.get('/api/containers/:id', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    const info = await container.inspect();
    res.json(info);
  } catch (error) {
    console.error('Error getting container info:', error);
    res.status(500).json({ error: 'Failed to get container info' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Docker API server running on port ${port}`);
});