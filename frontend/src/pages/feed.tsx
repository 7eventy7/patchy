import { useState } from 'react';
import { generateRepoColor, formatDate } from '../lib/utils';

// Mock data for development
const mockReleases = [
  {
    id: 1,
    repo: 'docker/docker',
    title: 'Docker 25.0',
    description: 'Major release with performance improvements and bug fixes',
    published_at: '2024-01-15T10:00:00Z',
    version: 'v25.0.0'
  },
  {
    id: 2,
    repo: 'kubernetes/kubernetes',
    title: 'Kubernetes 1.29',
    description: 'Latest stable release with new features',
    published_at: '2024-01-10T15:30:00Z',
    version: 'v1.29.0'
  }
];

export default function Feed() {
  const [releases] = useState(mockReleases);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Latest Releases</h1>
      </div>

      <div className="space-y-4">
        {releases.map((release) => (
          <div
            key={release.id}
            className="rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${generateRepoColor(release.repo)}`} />
                  <p className="text-sm text-muted-foreground">{release.repo}</p>
                </div>
                <h2 className="text-xl font-semibold">{release.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Version: {release.version}
                </p>
              </div>
              <time className="text-sm text-muted-foreground">
                {formatDate(release.published_at)}
              </time>
            </div>
            <p className="mt-4 text-muted-foreground">{release.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}