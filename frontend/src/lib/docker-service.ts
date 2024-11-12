interface ContainerInfo {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
  created: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:11778/api';

class DockerService {
  private async fetchWithError(url: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response;
  }

  async listContainers(all: boolean = true): Promise<ContainerInfo[]> {
    try {
      const response = await this.fetchWithError('/containers');
      return await response.json();
    } catch (error) {
      console.error('Error listing containers:', error);
      throw error;
    }
  }

  async getContainerInspect(containerId: string) {
    try {
      const response = await this.fetchWithError(`/containers/${containerId}`);
      return await response.json();
    } catch (error) {
      console.error('Error inspecting container:', error);
      throw error;
    }
  }

  async getContainerLogs(containerId: string, tail: number = 100) {
    try {
      const response = await this.fetchWithError(`/containers/${containerId}/logs`);
      return await response.text();
    } catch (error) {
      console.error('Error getting container logs:', error);
      throw error;
    }
  }
}

export const dockerService = new DockerService();
export type { ContainerInfo };