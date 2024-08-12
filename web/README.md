# Portfolio Web

This is the frontend web application for managing a digital artist's portfolio. 

## Table of Contents
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Application Structure](#application-structure)
   - [Components](#components)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Development](#development)
   - [Running the Development Server](#running-the-development-server)
   - [Building for Production](#building-for-production)

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
2. `PortfolioList.js`: Displays the list of portfolio items and manages the overall portfolio view.
3. `PortfolioItem.js`: Renders individual portfolio items and handles item-specific actions.
4. `Footer.js`: Renders the application footer.

## Technology Stack
- Framework: React
- UI Library: Material-UI (MUI)
- HTTP Client: Axios
- Icons: Material Icons

## Features
- Grid and list view modes for portfolio items
- Add, edit, and delete portfolio items
- Upload images or use image URLs for portfolio items
- Toggle visibility of portfolio items
- Preview images before saving
- Responsive design for various screen sizes

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

