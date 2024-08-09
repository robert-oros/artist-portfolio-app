# Digital Artist Portfolio

This is a web application for managing a digital artist's portfolio. The web application provides a user-friendly interface for the artist to showcase their work, while the API handles the backend functionality for managing the portfolio items.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)

## Technologies Used
- Frontend: React
- Backend: NestJS, TypeORM, SQLite

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

The web application will be available at `http://localhost:3000`, and the API will be running at `http://localhost:3000/api`