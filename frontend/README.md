# BookVerse Frontend

This project is **BookVerse Frontend**, a simple and responsive web interface for managing books. Built with **HTML**, **JavaScript**, and **Bootstrap**, it allows users to add, view, and delete books. The frontend communicates with a backend service deployed in a Kubernetes cluster, making it part of a 3-tier architecture.

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

**BookVerse Frontend** provides a clean and intuitive interface for interacting with the BookVerse backend API. Users can submit book titles and authors, view the list of stored books, and delete entries. The frontend is styled using **Bootstrap 5**, ensuring a responsive layout across devices. It is designed to run inside a Kubernetes-managed environment and connects to the backend service named `backend`.

---

## Features

- **Add Book**:
  - Submit book title and author using a simple form.

- **View Book List**:
  - Display all books retrieved from the backend.

- **Delete Book**:
  - Remove a book entry with a single click.

- **Responsive UI**:
  - Built with Bootstrap for mobile-friendly design.

- **Kubernetes Integration**:
  - Communicates with backend service named `backend` inside the cluster.

---

## Technologies Used

- **Frontend:**
  - **HTML5** for markup structure.
  - **JavaScript (ES6)** for dynamic behavior and API interaction.
  - **Bootstrap 5** for responsive styling and layout.

- **Infrastructure:**
  - **Docker** for containerization.
  - **Kubernetes** for deployment and service management.

---

## Installation

### Prerequisites

Ensure that you have the following installed:

- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- A running backend service named `backend` on port `5000`

### Steps

1. **Enter the directory:**
   ```bash
   cd frontend
   ```

2. **Serve the HTML file:** You can use any static file server or host it via Nginx, Apache, or Kubernetes.

3. **Upload to docker registry (Docker Hub):** Run the following commands:
    - **Build the image:** 
      ```bash
      docker build --no-cache -t bookverse-frontend:latest path-to-Dockerfile
      ```
    - **Tag the image:** 
      ```bash 
      docker tag bookverse-frontend:latest username/repository:latest
      ```
    - **Push the image to docker hub:** 
      ```bash
      docker push username/repository:latest
      ```

4. **Deploy to Kubernetes:**
    - Create a deployment and service for the frontend.
    - Ensure it can resolve the backend service name ```backend```.

---

## Usage

1. **Add a Book:**
    - Fill in the book title and author fields.
    - Click "Add Book" to submit.

2. **View Books:**
    - The book list is automatically fetched and displayed.

3. **Delete a Book:**
    - Click the "Delete" button next to a book entry to remove it.


---

## Components

1. ```index.html```
    - Main HTML file containing the form, book list, and embedded JavaScript.

2. **Form Section**
    - Collects book title and author input.

3. **Book List Section**
    - Displays all books with delete functionality.

4. **JavaScript Logic**
    - Handles API calls to the backend for CRUD operations.

---

## Project Structure

```bash
    frontend/
    ├── index.html              # Main HTML file
    ├── images/                 # Favicon and manifest assets
    │   ├── apple-touch-icon.png
    │   ├── favicon-32x32.png
    │   ├── favicon-16x16.png
    │   └── site.webmanifest
    └── README.md               # Project documentation
  ```
