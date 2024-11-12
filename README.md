# Patchy - Docker Release Notes Aggregator

Patchy is a performant web UI application for aggregating and displaying patch/release notes from Docker containers. It provides a clean, modern interface for tracking and monitoring updates across your Docker ecosystem.

## Features

- **Latest Feed**: View the most recent patch notes from all tracked repositories
- **Repository List**: Browse all tracked repositories and their release histories
- **Timeline View**: Visualize releases chronologically with a configurable timeline
- **Settings**: Customize the application theme and appearance
- **Unique Repository Colors**: Each repository has its own distinct color for easy identification
- **Docker Integration**: Built specifically for Docker containers and Unraid environments

## Technical Stack

- React + TypeScript for the frontend
- Vite for fast development and building
- Tailwind CSS for styling
- Radix UI for accessible components
- Docker for containerization

## Installation

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/7eventy7/patchy.git
cd patchy
```

2. Start the application:
```bash
docker-compose up -d
```

The application will be available at `http://localhost:11777`

### Manual Development Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Docker Hub Publishing

The project is configured to automatically publish Docker images to Docker Hub when a new GitHub release is created. The published images will be tagged with both the specific version number and 'latest'.

### Setting up Docker Hub Publishing

1. Create a Docker Hub account if you don't have one
2. In your GitHub repository settings, add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub access token (create one in Docker Hub account settings)

### Creating a Release

To publish a new version to Docker Hub:

1. Go to the GitHub repository
2. Click on "Releases" in the sidebar
3. Click "Create a new release"
4. Choose a tag (e.g., v1.0.0)
5. Fill in the release title and description
6. Click "Publish release"

The GitHub Action will automatically:
- Build the Docker image
- Tag it with the release version and 'latest'
- Push it to Docker Hub

## Configuration
### Ports

- Frontend: 11777
  
### Environment Variables

- `NODE_ENV`: Set to 'production' for production mode
- Additional environment variables can be configured in the docker-compose.yml file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for any purpose.