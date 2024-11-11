import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a unique color for a repository based on its name
export function generateRepoColor(repoName: string): string {
  const colors = [
    'repo-color-1', 'repo-color-2', 'repo-color-3', 'repo-color-4', 'repo-color-5',
    'repo-color-6', 'repo-color-7', 'repo-color-8', 'repo-color-9', 'repo-color-10'
  ];
  
  // Create a simple hash of the repo name
  const hash = repoName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Use the hash to select a color
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
}

// Format date for timeline display
export function formatDate(date: string | Date | number): string {
  const dateObj = typeof date === 'number' ? new Date(date * 1000) : new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Sort releases by date
export function sortReleasesByDate(releases: any[], ascending = false): any[] {
  return [...releases].sort((a, b) => {
    const dateA = new Date(a.published_at || a.created_at).getTime();
    const dateB = new Date(b.published_at || b.created_at).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

// Group releases by month and year for timeline view
export function groupReleasesByMonth(releases: any[]): Record<string, any[]> {
  return releases.reduce((groups, release) => {
    const date = new Date(release.published_at || release.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!groups[key]) {
      groups[key] = [];
    }
    
    groups[key].push(release);
    return groups;
  }, {} as Record<string, any[]>);
}