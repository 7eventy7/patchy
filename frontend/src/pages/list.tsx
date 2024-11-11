import { useState } from 'react';
import { generateRepoColor } from '../lib/utils';
import { ChevronRightIcon } from 'lucide-react';

// Mock data for development
const mockRepos = [
  {
    id: 1,
    name: 'docker/docker',
    description: 'Docker container platform',
    lastUpdate: '2024-01-15T10:00:00Z',
    releaseCount: 15
  },
  {
    id: 2,
    name: 'kubernetes/kubernetes',
    description: 'Container orchestration platform',
    lastUpdate: '2024-01-10T15:30:00Z',
    releaseCount: 25
  },
  {
    id: 3,
    name: 'nginx/nginx',
    description: 'Web server and reverse proxy',
    lastUpdate: '2024-01-08T09:15:00Z',
    releaseCount: 8
  }
];

interface RepoDetailModalProps {
  repo: typeof mockRepos[0];
  onClose: () => void;
}

function RepoDetailModal({ repo, onClose }: RepoDetailModalProps) {
  // Mock release notes for the selected repository
  const mockReleaseNotes = [
    {
      id: 1,
      version: 'v25.0.0',
      date: '2024-01-15',
      notes: 'Major release with performance improvements and bug fixes'
    },
    {
      id: 2,
      version: 'v24.9.0',
      date: '2023-12-20',
      notes: 'Added new features and security updates'
    }
  ];

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
            <div className={`h-3 w-3 rounded-full ${generateRepoColor(repo.name)}`} />
            <h2 className="text-2xl font-bold">{repo.name}</h2>
          </div>
          <p className="text-muted-foreground">{repo.description}</p>
          <div className="space-y-4">
            {mockReleaseNotes.map((release) => (
              <div key={release.id} className="border-t border-border pt-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{release.version}</h3>
                  <span className="text-sm text-muted-foreground">{release.date}</span>
                </div>
                <p className="mt-2 text-muted-foreground">{release.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function List() {
  const [repos] = useState(mockRepos);
  const [selectedRepo, setSelectedRepo] = useState<typeof mockRepos[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tracked Repositories</h1>
      </div>

      <div className="space-y-4">
        {repos.map((repo) => (
          <button
            key={repo.id}
            onClick={() => setSelectedRepo(repo)}
            className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${generateRepoColor(repo.name)}`} />
                  <h2 className="font-semibold">{repo.name}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{repo.description}</p>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{repo.releaseCount} releases</span>
              <span>Last updated: {new Date(repo.lastUpdate).toLocaleDateString()}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedRepo && (
        <RepoDetailModal
          repo={selectedRepo}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </div>
  );
}