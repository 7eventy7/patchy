import { useState, useEffect } from 'react';
import { generateRepoColor } from '../lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import { dockerService, type ContainerInfo } from '../lib/docker-service';

interface ContainerDetailModalProps {
  container: ContainerInfo;
  onClose: () => void;
}

function ContainerDetailModal({ container, onClose }: ContainerDetailModalProps) {
  const [logs, setLogs] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const containerLogs = await dockerService.getContainerLogs(container.id);
        setLogs(containerLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [container.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-lg border border-border bg-card p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          ✕
        </button>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${generateRepoColor(container.name)}`} />
            <h2 className="text-2xl font-bold">{container.name}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Image: </span>
              <span className="text-muted-foreground">{container.image}</span>
            </div>
            <div>
              <span className="font-semibold">State: </span>
              <span className="text-muted-foreground">{container.state}</span>
            </div>
            <div>
              <span className="font-semibold">Status: </span>
              <span className="text-muted-foreground">{container.status}</span>
            </div>
            <div>
              <span className="font-semibold">Created: </span>
              <span className="text-muted-foreground">
                {new Date(container.created).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Container Logs</h3>
            {loading ? (
              <div className="text-center text-muted-foreground">Loading logs...</div>
            ) : (
              <pre className="max-h-96 overflow-auto rounded-lg bg-muted p-4 text-sm">
                {logs || 'No logs available'}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function List() {
  const [containers, setContainers] = useState<ContainerInfo[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<ContainerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const containerList = await dockerService.listContainers(true);
        setContainers(containerList);
        setError(null);
      } catch (err) {
        setError('Failed to fetch containers. Please check your Docker connection.');
        console.error('Error fetching containers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContainers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading containers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-destructive">{error}</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Make sure Docker is running and the socket is accessible.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Docker Containers</h1>
      </div>

      <div className="space-y-4">
        {containers.length === 0 ? (
          <div className="text-center text-muted-foreground">No containers found</div>
        ) : (
          containers.map((container) => (
            <button
              key={container.id}
              onClick={() => setSelectedContainer(container)}
              className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${generateRepoColor(container.name)}`} />
                    <h2 className="font-semibold">{container.name}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">{container.image}</p>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span>Status: {container.status}</span>
                <span>State: {container.state}</span>
              </div>
            </button>
          ))
        )}
      </div>

      {selectedContainer && (
        <ContainerDetailModal
          container={selectedContainer}
          onClose={() => setSelectedContainer(null)}
        />
      )}
    </div>
  );
}