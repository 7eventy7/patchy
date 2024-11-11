import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { dockerService } from './docker-service';

const app = new Hono();

// Enable CORS
app.use('/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:11777'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Docker-Container-Count'],
  credentials: true,
}));

// Error handling middleware
app.use('*', async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error('Error:', error);
    return c.json({
      error: error instanceof Error ? error.message : 'Internal Server Error',
    }, 500);
  }
});

// List all containers
app.get('/api/containers', async (c) => {
  const all = c.req.query('all') !== 'false';
  const containers = await dockerService.listContainers(all);
  c.header('X-Docker-Container-Count', containers.length.toString());
  return c.json(containers);
});

// Get container info
app.get('/api/containers/:id', async (c) => {
  const containerId = c.req.param('id');
  const info = await dockerService.getContainerInfo(containerId);
  return c.json(info);
});

// Get container logs
app.get('/api/containers/:id/logs', async (c) => {
  const containerId = c.req.param('id');
  const tail = parseInt(c.req.query('tail') || '100');
  const logs = await dockerService.getContainerLogs(containerId, tail);
  return c.json({ logs });
});

// Get container stats
app.get('/api/containers/:id/stats', async (c) => {
  const containerId = c.req.param('id');
  const stats = await dockerService.getContainerStats(containerId);
  return c.json(stats);
});

// Health check endpoint
app.get('/health', (c) => c.json({ status: 'ok' }));

const port = parseInt(process.env.PORT || '11778');
console.log(`Server starting on port ${port}...`);

serve({
  fetch: app.fetch,
  port,
});