# Digital Artist Portfolio

This is a web application for managing a digital artist's portfolio. The web application provides a user-friendly interface for the artist to showcase their work, while the API handles the backend functionality for managing the portfolio items.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)
- [API Overview](#api-overview)
- [Web Application](#web-application)

## Features
1. Portfolio Item Management
    - Create, read, update, and delete portfolio items
    - Each item includes: title, description, image URL, client website URL, and visibility status
2. File Upload
    - Support for image uploads
3. Portfolio Display
    - Grid and list view modes for portfolio items
    - Toggle visibility of portfolio items
    - Preview images before saving

## Technologies Used
- Frontend: React, Material-UI (MUI)
- Backend: NestJS, TypeORM, SQLite
- HTTP Client: Axios

## Project Structure
The repository is divided into two main folders:
1. **web**: Contains the front-end web application built with React.
2. **api**: Contains the backend API built with NestJS.

## Getting Started
### Prerequisites
- Node.js (version 16 or higher)
- npm (version 6 or higher)


### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/robert-oros/artist-portfolio-app
    ```

2. Navigate to the project directory:
    ```bash
    cd digital-artist-portfolio
    ```

3. Install the dependencies for both the web and API:
    ```bash
    cd web
    npm install
    cd ../api
    npm install
    ```

### Running the Application
1. Start the API server:
    ```bash
    cd api
    npm run start:dev
    ```

2. Start the web application:
    ```bash
    cd web
    npm start
    ```

The web application will be available at `http://localhost:8080`, and the API will be running at `http://localhost:3000/portfolio`

## API Overview
The backend API provides the following endpoints for managing portfolio items:
- `GET /api/portfolio`: Retrieve all portfolio items
- `GET /api/portfolio/:id`: Retrieve a specific portfolio item by ID
- `POST /api/portfolio`: Create a new portfolio item
- `PATCH /api/portfolio/:id`: Update an existing portfolio item
- `DELETE /api/portfolio/:id`: Delete a portfolio item

File Upload
- `POST /upload`: Upload an image file

For detailed information on request/response formats and usage examples, please refer to the API Documentation in the API folder.

## Web Application
The web application is built with React and provides a user-friendly interface for managing the portfolio. Key components include:

- `index.js`: The entry point of the React application.
- `App.js`: The main component that sets up the application structure.
- `components/Header.js`: Renders the application header.
- `components/Footer.js`: Renders the application footer.
- `components/PortfolioList.js`: Manages the overall portfolio view, including toggling between grid and list display modes, and adding new items.
- `components/PortfolioItem.js`: Handles the display and editing of individual portfolio items.
- `components/ItemGridView.js`: Defines the structure of portfolio items when displayed in grid view.
- `components/ItemListView.js`: Defines the structure of portfolio items when displayed in list view.


Features:
- Responsive design for various screen sizes
- Image preview before saving
- Toggle between grid and list view modes

For more details on the web application structure and setup, refer to the README in the `web` folder.
