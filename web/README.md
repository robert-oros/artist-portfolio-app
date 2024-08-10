# Portfolio Web

This is the frontend web application for managing a digital artist's portfolio. 

## Table of Contents
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Application Structure](#application-structure)
   - [Components](#components)
- [Technology Stack](#technology-stack)
- [Development](#development)
   - [Running the Development Server](#running-the-development-server)
   - [Building for Production](#building-for-production)
<!-- - [Testing](#testing) -->

## Getting Started
### Prerequisites
- Node.js (version 16 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/digital-artist-portfolio
    cd digital-artist-portfolio/web/
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Application Structure
The web application is structured as follows:

```
src/
├── components/
│   ├── Footer.js
|   ├── Header.js
│   ├── PortfolioItem.js
│   └── PortfolioList.js
├── App.js
└── index.js
```

### Components

1. `Header.js`: Renders the application header.
2. `PortfolioList.js`: Displays the list of portfolio items.
3. `PortfolioForm.js`: Provides a form for creating and editing portfolio items.

## Technology Stack
- Framework: React
- UI Library: Material-UI
- Routing: React Router
- HTTP Client: Axios

## Development
### Running the Development Server

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:8080`.

### Building for Production

To create a production build:

```bash
npm run build
```

This will create a `build` folder with the production-ready files.

<!-- ## Testing

To run the test suite:

```bash
npm test
``` -->

