# README for the Blog Website Server

## Overview
This is the server component of the Blog Website project. It is built using Node.js and serves as the backend for the application, handling API requests and managing data.

## Getting Started

### Prerequisites
- Node.js (version 22 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd blog-website/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Server
To start the server, use the following command:
```
npm start
```
The server will run on port 7000 by default.

### Docker
To build and run the server using Docker, follow these steps:

1. Build the Docker image:
   ```
   docker build -t blog-website-server .
   ```

2. Run the Docker container:
   ```
   docker run -p 7000:7000 blog-website-server
   ```

### API Endpoints
- `/api/posts`: Get all blog posts
- `/api/posts/:id`: Get a specific blog post by ID
- `/api/posts`: Create a new blog post (POST)
- `/api/posts/:id`: Update a blog post by ID (PUT)
- `/api/posts/:id`: Delete a blog post by ID (DELETE)

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.