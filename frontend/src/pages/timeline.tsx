import { useState } from 'react';
import { generateRepoColor, groupReleasesByMonth, formatDate } from '../lib/utils';

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
  },
  {
    id: 3,
    repo: 'nginx/nginx',
    title: 'NGINX 1.24.1',
    description: 'Security updates and improvements',
    published_at: '2023-12-25T09:00:00Z',
    version: 'v1.24.1'
  }
];

export default function Timeline() {
  const [releases] = useState(mockReleases);
  const [timelineView, setTimelineView] = useState<'month' | 'year'>('month');
  const groupedReleases = groupReleasesByMonth(releases);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Release Timeline</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTimelineView('month')}
            className={`rounded-md px-3 py-1 text-sm ${
              timelineView === 'month'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimelineView('year')}
            className={`rounded-md px-3 py-1 text-sm ${
              timelineView === 'year'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="relative space-y-8">
        {/* Timeline line */}
        <div className="absolute left-9 top-0 bottom-0 w-px bg-border" />

        {Object.entries(groupedReleases).map(([date, monthReleases]) => (
          <div key={date} className="relative">
            {/* Timeline date marker */}
            <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>

            <div className="ml-16 space-y-4">
              <h2 className="text-xl font-semibold">
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </h2>

              <div className="space-y-4">
                {monthReleases.map((release) => (
                  <div
                    key={release.id}
                    className="rounded-lg border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-3 w-3 rounded-full ${generateRepoColor(
                              release.repo
                            )}`}
                          />
                          <p className="text-sm text-muted-foreground">
                            {release.repo}
                          </p>
                        </div>
                        <h3 className="font-semibold">{release.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Version: {release.version}
                        </p>
                      </div>
                      <time className="text-sm text-muted-foreground">
                        {formatDate(release.published_at)}
                      </time>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {release.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}