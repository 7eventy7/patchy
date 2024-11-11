interface Container {
  id: string;
  name: string;
  image: string;
  status: string;
  state: string;
  created: number;
  ports: any[];
}

class DockerService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:11777/api';
  }

  async listContainers(all: boolean = true): Promise<Container[]> {
    try {
      const response = await fetch(`${this.apiUrl}/containers?all=${all}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.map((container: any) => ({
        id: container.Id,
        name: container.Names[0].replace(/^\//, ''),
        image: container.Image,
        status: container.State,
        state: container.Status,
        created: container.Created,
        ports: container.Ports || [],
      }));
    } catch (error) {
      console.error('Error listing containers:', error);
      throw error;
    }
  }

  async getContainerInfo(containerId: string) {
    try {
      const response = await fetch(`${this.apiUrl}/containers/${containerId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const info = await response.json();
      return {
        id: info.Id,
        name: info.Name.replace(/^\//, ''),
        image: info.Config.Image,
        status: info.State.Status,
        state: info.State.Status,
        created: info.Created,
        ports: info.NetworkSettings.Ports || [],
        labels: info.Config.Labels || {},
      };
    } catch (error) {
      console.error('Error getting container info:', error);
      throw error;
    }
  }
}

export const dockerService = new DockerService();