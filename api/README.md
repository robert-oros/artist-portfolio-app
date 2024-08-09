# Portfolio API
This is the backend API for a digital artist's portfolio. The API provides CRUD (Create, Read, Update, Delete) functionality for managing portfolio items.

## Table of Contents
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [API Documentation](#api-documentation)
   - [Endpoints](#endpoints)
   - [Error Handling](#error-handling)
- [Technology Stack](#technology-stack)
- [Development](#development)
   - [Running the Development Server](#running-the-development-server)
   - [Running the Production Server](#running-the-production-server)
- [Testing](#testing)

## Getting Started
### Prerequisites
- Node.js (version 16 or higher)
- npm (version 6 or higher)

### Installation

- Clone the repository:
    ```bash
    git clone https://github.com/robert-oros/artist-portfolio-app
    cd artist-portfolio-app/api/
    ```

- Ensure you have `make` installed on your system. If not, you can still use `npm` commands. To install dependencies:
    ```bash
    make install
    ``` 
    or
    ```bash
    npm install
    ```

## API Documentation

### Endpoints

`GET /portfolio`
- Description: Retrieves a list of all portfolio items.
- Response: Array of portfolio item objects.
  ```json
  [
    {
      "id": 1,
      "title": "Portfolio Item 1",
      "description": "Description of portfolio item 1",
      "imageUrl": "https://...",
      "clientWebsiteUrl": "https://...",
      "isVisible": true
    },
    ...
  ]

`GET /portfolio/:id`
- Description: Retrieves a specific portfolio item by its ID.
- Parameters:
    - `id` (number): The ID of the portfolio item to retrieve.
- Response: A portfolio item object.

`POST /portfolio`
- Description: Creates a new portfolio item.
- Request Body: A portfolio item object.
    ```json
    {
    "title": "Your title",
    "description": "Your description",
    "imageUrl": "https://...",
    "clientWebsiteUrl": "https://...",
    "isVisible": true
    }
    ```
- Response: The created portfolio item object.

`PATCH /portfolio/:id`
- Description: Updates an existing portfolio item by its ID.
- Parameters:
    - `id` (number): The ID of the portfolio item to update.
- Request Body: Partial portfolio item object with the fields to update.
- Response: The updated portfolio item object.

## Error Handling
The API uses standard HTTP response codes to indicate the success or failure of an API request.

The API uses the following HTTP status codes:
- `200 OK`: The request was successful.
- `201 Created`: The request was successful and a resource was created.
- `400 Bad Request`: The request was invalid or cannot be served.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: The server encountered an unexpected condition which prevented it from fulfilling the request.

Examples:
1. Successful GET request:
    ```bash 
    Status: 200 OK
    ```
2. Successful POST request:
    ```bash 
    Status: 201 Created
    ```
3. Invalid input for POST or PATCH request:
    ```bash 
    Status: 400 Bad Request
    {
      "message": "Unexpected token } in JSON at position 166",
      "error": "Bad Request",
      "statusCode": 400
    }
    ```
4. Resource not found:
    ```bash 
    Status: 404 Not Found
    {
      "message": "Cannot GET /path",
      "error": "Not Found",
      "statusCode": 404
    }
    ```
5. Server error:
    ```bash 
    Status: 500 Internal Server Error
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

## Technology Stack
- Framework: NestJS
- ORM: TypeORM
- Database: SQLite

## Development
### Running the Development Server

```bash
make dev
```
Alternatively, you can use:

```bash
npm run start:dev
```
### Running the Production Server
The API is running on port 3000 by default. You can change this in the `src/main.ts` file.
```bash
make prod
```
or

```bash
npm run start:prod
```

## Testing
```bash
make test
```
or
```bash
npm run test
```