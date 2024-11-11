import Dockerode from 'dockerode';

class DockerService {
  private docker: Dockerode;

  constructor() {
    // Initialize Docker client with the path from environment variable
    const dockerPath = process.env.DOCKER_PATH || '/var/lib/docker';
    this.docker = new Dockerode({ socketPath: dockerPath });
  }

  async listContainers(all: boolean = true) {
    try {
      const containers = await this.docker.listContainers({ all });
      return containers.map(container => ({
        id: container.Id,
        name: container.Names[0].replace(/^\//, ''),
        image: container.Image,
        status: container.State,
        state: container.Status,
        created: container.Created,
        ports: container.Ports,
      }));
    } catch (error) {
      console.error('Error listing containers:', error);
      throw error;
    }
  }

  async getContainerInfo(containerId: string) {
    try {
      const container = this.docker.getContainer(containerId);
      const info = await container.inspect();
      return {
        id: info.Id,
        name: info.Name.replace(/^\//, ''),
        image: info.Config.Image,
        status: info.State.Status,
        state: info.State.Status,
        created: info.Created,
        ports: info.NetworkSettings.Ports,
        labels: info.Config.Labels || {},
      };
    } catch (error) {
      console.error('Error getting container info:', error);
      throw error;
    }
  }
}

export const dockerService = new DockerService();