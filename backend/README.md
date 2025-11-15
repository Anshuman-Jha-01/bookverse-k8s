# BookVerse Backend

This project is **BookVerse Backend**, the server-side component of a 3-tier book management application. Built with **Node.js**, **Express**, and **MongoDB**, this backend provides RESTful APIs for managing book data. It is designed to run inside a **Kubernetes (K8s)** cluster and connects to a MongoDB service named `mongo-service`.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Project Structure](#project-structure)

---

## Project Overview

**BookVerse Backend** is a lightweight REST API server that handles book data operations such as retrieval, creation, and deletion. It uses **Express.js** for routing and middleware, and **Mongoose** to interact with a MongoDB database. The backend is containerized and intended to be deployed as part of a Kubernetes-managed microservices architecture, where it communicates with a MongoDB pod via the service name `mongo-service`.

---

## Features

- **Book Retrieval**:
  - Fetch all books stored in the MongoDB database.

- **Book Creation**:
  - Add new books with title and author fields.

- **Book Deletion**:
  - Delete a book by its unique ID.

- **MongoDB Integration**:
  - Connects to a MongoDB pod using Kubernetes service discovery.

- **CORS Enabled**:
  - Allows cross-origin requests from frontend services.

- **JSON & URL-Encoded Parsing**:
  - Supports both JSON and form data in requests.

---

## Technologies Used

- **Backend:**
  - **Node.js** for server-side JavaScript runtime.
  - **Express.js** for building RESTful APIs.
  - **Mongoose** for MongoDB object modeling.
  - **CORS** middleware for cross-origin resource sharing.

- **Infrastructure:**
  - **Docker** for containerization.
  - **Kubernetes** for orchestration and service management.

---

## Installation

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)

### Steps

1. **Enter the directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
    ```bash 
    npm install
    ```
    
3. **Start the development server:**
    ```bash
    node server.js
    ```

4. **Upload to docker registry (Docker Hub):**
  - Run the following commands:
    - **Build the image:** 
      ```bash 
      docker build --no-cache -t bookverse-backend:latest path-to-Dockerfile
      ```
    - **Tag the image:** 
      ```bash
      docker tag bookverse-backend:latest username/repository:latest
      ```
    - **Push the image to docker hub:** 
      ```bash
      docker push username/repository:latest
      ```

5. **Deploy to Kubernetes:**
    - Ensure you have a MongoDB pod and service named ```mongo-service```.
    - Create a deployment and service for this backend using your K8s manifests.

---

## Usage

1. **GET /api/books:**
    - Returns a list of all books in the database.

2. **POST /api/books:**
    - Accepts a JSON body with ```title``` and ```author``` to create a new book.

3. **DELETE /api/books/:id:**
    - Deletes the book with the specified MongoDB ```_id```.

---

## Components

1. ```server.js```
    - Main entry point of the application.
    - Sets up middleware, connects to MongoDB, and defines API routes.

2. ```Book``` Model
    - Mongoose schema defining the structure of book documents.

3. **API Routes**
    - ```/api/books``` (GET, POST)
    - ```/api/books/:id``` (DELETE)

---

## Project Structure

```bash
  backend/
    ├── server.js           # Main server file with Express and Mongoose setup
    ├── package.json        # Project metadata and dependencies
    └── README.md           # Project documentation
  ```
