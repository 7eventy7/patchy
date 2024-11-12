<div align="center">

# <img src="icons/patchy.png" width="32" height="32" alt="Patchy Icon"> Patchy

### Docker Patch Notes Aggregator

[![GitHub stars](https://img.shields.io/github/stars/7eventy7/patchy.svg?style=social&label=Star&maxAge=2592000)](https://github.com/7eventy7/patchy/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/7eventy7/patchy.svg)](https://github.com/7eventy7/patchy/issues)
[![Docker Pulls](https://img.shields.io/docker/pulls/7eventy7/patchy.svg)](https://hub.docker.com/r/7eventy7/patchy)
[![License](https://img.shields.io/github/license/7eventy7/patchy.svg)](https://github.com/7eventy7/patchy/blob/main/LICENSE)

A performant web UI application for aggregating and displaying patch notes from Docker containers. Keep track of updates across your Docker ecosystem with a clean, modern interface.

</div>

---

## ✨ Features

- **📅 Timeline**: Visualize releases chronologically with a configurable timeline
- **📚 Catalog**: Browse all tracked repositories and their release histories
- **⚙️ Settings**: Customize the application theme and appearance
- **🎨 Unique Repository Colors**: Each repository has its own distinct color for easy identification

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
