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
git clone https://github.com/yourusername/patchy.git
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

## Ports

- Frontend: 11777

## Configuration

### Environment Variables

- `NODE_ENV`: Set to 'production' for production mode
- Additional environment variables can be configured in the docker-compose.yml file

## Unraid Installation

1. Add the Docker container through the Unraid interface
2. Use the following container settings:
   - Repository: patchy
   - Network Type: Bridge
   - Port: 11777
   - Path: /your/config/path

## Development

### Project Structure

```
patchy/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── lib/        # Utility functions
│   │   └── hooks/      # Custom React hooks
│   ├── public/         # Static assets
│   └── index.html      # Entry point
├── docker-compose.yml  # Docker Compose configuration
└── README.md          # Project documentation
```

### Building for Production

```bash
cd frontend
npm run build
```

The production build will be available in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for any purpose.