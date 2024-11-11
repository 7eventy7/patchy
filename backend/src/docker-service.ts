import Docker from 'dockerode';

export class DockerService {
  private docker: Docker;

  constructor() {
    const dockerPath = process.env.DOCKER_PATH || '/var/lib/docker';
    this.docker = new Docker({ socketPath: dockerPath });
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
        ports: container.Ports || [],
      }));
    } catch (error) {
      console.error('Error listing containers:', error);
      throw new Error('Failed to list containers');
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
        ports: info.NetworkSettings.Ports || [],
        labels: info.Config.Labels || {},
      };
    } catch (error) {
      console.error('Error getting container info:', error);
      throw new Error(`Failed to get container info for ${containerId}`);
    }
  }

  async getContainerLogs(containerId: string, tail: number = 100) {
    try {
      const container = this.docker.getContainer(containerId);
      const logs = await container.logs({
        stdout: true,
        stderr: true,
        tail,
        timestamps: true,
      });
      return logs.toString('utf-8');
    } catch (error) {
      console.error('Error getting container logs:', error);
      throw new Error(`Failed to get logs for container ${containerId}`);
    }
  }

  async getContainerStats(containerId: string) {
    try {
      const container = this.docker.getContainer(containerId);
      const stats = await container.stats({ stream: false });
      return stats;
    } catch (error) {
      console.error('Error getting container stats:', error);
      throw new Error(`Failed to get stats for container ${containerId}`);
    }
  }
}

export const dockerService = new DockerService();