<div align="center">

# <img src="icons/patchy.png" width="32" height="32" alt="Patchy Icon"> Patchy

### Docker Release Notes Aggregator

A performant web UI application for aggregating and displaying patch/release notes from Docker containers. Keep track of updates across your Docker ecosystem with a clean, modern interface.

</div>

---

## ✨ Features

- **📰 Latest Feed**: View the most recent patch notes from all tracked repositories
- **📚 Repository List**: Browse all tracked repositories and their release histories
- **📅 Timeline View**: Visualize releases chronologically with a configurable timeline
- **⚙️ Settings**: Customize the application theme and appearance
- **🎨 Unique Repository Colors**: Each repository has its own distinct color for easy identification
- **🐳 Docker Integration**: Built specifically for Docker containers and Unraid environments

## 🚀 Getting Started

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

## ⚙️ Configuration

### Ports
- Frontend: 11777
  
### Environment Variables
- `NODE_ENV`: Set to 'production' for production mode
- Additional environment variables can be configured in the `docker-compose.yml` file

## 🔄 Docker Hub Updates

Patchy is automatically published to Docker Hub when a new release is created. Images are tagged with both the specific version number and 'latest'.

To use the latest version from Docker Hub:
```bash
docker pull 7eventy7/patchy:latest
```

## 🛠️ Technical Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Docker

## 📝 License

MIT License - feel free to use this project for any purpose.

---

<div align="center">

Made with ❤️ by [7eventy7](https://github.com/7eventy7)

</div>
