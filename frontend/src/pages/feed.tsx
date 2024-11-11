import { useState, useEffect } from 'react';
import { formatDate } from '../lib/utils';
import { dockerService } from '../lib/docker-service';

interface Port {
  IP?: string;
  PrivatePort?: number;
  PublicPort?: number;
  Type: string;
}

interface Container {
  id: string;
  name: string;
  image: string;
  status: string;
  state: string;
  created: number;
  ports: Port[];
}

export default function Feed() {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContainers() {
      try {
        const containerList = await dockerService.listContainers();
        setContainers(containerList);
        setError(null);
      } catch (err) {
        setError('Failed to fetch containers. Please check your Docker connection.');
        console.error('Error fetching containers:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchContainers();
    // Refresh container list every 30 seconds
    const interval = setInterval(fetchContainers, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">Loading containers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Docker Containers</h1>
        <div className="text-sm text-muted-foreground">
          {containers.length} containers found
        </div>
      </div>

      <div className="space-y-4">
        {containers.map((container) => (
          <div
            key={container.id}
            className="rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div 
                    className={`h-3 w-3 rounded-full ${
                      container.state.includes('running') 
                        ? 'bg-green-500' 
                        : container.state.includes('exited')
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`} 
                  />
                  <p className="text-sm text-muted-foreground">{container.image}</p>
                </div>
                <h2 className="text-xl font-semibold">{container.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Status: {container.state}
                </p>
                {container.ports && container.ports.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Ports: {container.ports.map(p => 
                      `${p.PublicPort || ''}:${p.PrivatePort || ''}`
                    ).join(', ')}
                  </p>
                )}
              </div>
              <time className="text-sm text-muted-foreground">
                {formatDate(container.created)}
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}