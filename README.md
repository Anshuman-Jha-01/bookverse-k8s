# 📚 BookVerse

**BookVerse** is a 3-tier book management application deployed on **Kubernetes (K8s)**.  
It consists of:

- **Frontend**: A responsive web interface built with HTML, JavaScript, and Bootstrap.
- **Backend**: A RESTful API built with Node.js and Express, connected to MongoDB.
- **Database**: MongoDB with persistent storage.

This repository contains instructions and Kubernetes manifests for deploying all three tiers, along with networking policies and ingress configuration.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Kubernetes Resources](#kubernetes-resources)
- [Project Structure](#project-structure)

---

## Project Overview

**BookVerse** allows users to:

- Add books with title and author.
- View a list of all books.
- Delete books by ID.

The application is containerized and orchestrated using Kubernetes, ensuring scalability, resilience, and service discovery.  
Networking policies secure internal communication, while ingress exposes the frontend to external users via a custom domain.

---

## Features

- **Frontend**:
  - Responsive UI with Bootstrap.
  - Form to add books.
  - Dynamic book list with delete functionality.

- **Backend**:
  - RESTful API with Express.
  - MongoDB integration via Mongoose.
  - Endpoints for CRUD operations.

- **Database**:
  - MongoDB 6.0 with persistent storage.
  - PersistentVolume (PV) and PersistentVolumeClaim (PVC) for data durability.

- **Kubernetes**:
  - Deployments and Services for each tier.
  - NetworkPolicy restricting backend-to-database communication.
  - Ingress routing external traffic to the frontend via `bookverse.org`.

---

## Technologies Used

- **Frontend**: HTML5, JavaScript (ES6), Bootstrap 5
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB 6.0
- **Infrastructure**: Docker, Kubernetes, NGINX Ingress Controller

---

## Architecture

![Kubernetes Workflow](<assets/Architecture.png>)

---

## Installation

### Prerequisites
- A running Kubernetes cluster.
- `kubectl` configured to access the cluster.
- NGINX Ingress Controller (if exposing frontend externally).
- Docker images pushed to registry:
    - ```your-username/bookverse-frontend:latest```
    - ```your-username/bookverse-backend:latest```

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anshuman-Jha-01/bookverse-k8s.git
   cd bookverse-k8s
   ``` 

2. **Build and push the frontend image:** Follow the instructions written in the ```README.md``` file in the ```frontend``` directory. 

3. **Build the push the backend image:** Follow the instructions written in the ```README.md``` file in the ```backend``` directory. 

4. **Start the kind cluster:** Follow the instructions written in the ```README.md``` file in the root ```K8s``` directory. 

5. **Apply MongoDB resources:** Follow the instructions written in the ```README.md``` file in the root ```K8s``` directory.

6. **Apply Backend resources:** Follow the instructions written in the ```README.md``` file in the root ```K8s``` directory.

7. **Apply Frontend resources:** Follow the instructions written in the ```README.md``` file in the root ```K8s``` directory.

8. **Setup Ingress and NetworkPolicy:** Follow the instructions written in the ```README.md``` file inside the ```K8s/networking``` directory.

---

## Usage

- Access the application via: ```http://bookverse.org```
- **Frontend:**
    - Add books using the form.
    - View and delete books from the list.
- **Backend API:**
    - ```GET /api/books``` → Fetch all books
    - ```POST /api/books``` → Add a new book
    - ```DELETE /api/books/:id``` → Delete a book by ID
---

## Kubernetes Resources

- **Frontend:**
    - ```frontend-deploy.yaml```
    - ```frontend-service.yaml```
- **Backend:**
    - ```backend-deploy.yaml```
    - ```backend-service.yaml```
- **MongoDB:**
    - ```mongo-deploy.yaml```
    - ```mongo-service.yaml```
    - ```mongo-pv.yaml```
    - ```mongo-pvc.yaml```
- **Networking:**
    - ```network-policy.yaml``` (backend → mongo)
    - ```ingress.yaml``` (frontend exposed via ```bookverse.org```)

---

## Project Structure
```bash
    BookVerse/
    ├──  backend/
    │    ├── server.js
    │    ├── Dockerfile    
    │    ├── package.json
    │    ├── package-lock.json
    │    └── README.md
    ├──  frontend/
    │    ├── images/
    │    ├── Dockerfile    
    │    ├── index.html
    │    └── README.md
    ├──  K8s/
    │    ├── frontend-k8s/
    │    │   ├── frontend-deploy.yaml
    │    │   ├── frontend-service.yaml
    │    │   └── kustomization.yaml
    │    │
    │    ├── backend-k8s/
    │    │   ├── backend-deploy.yaml
    │    │   ├── backend-service.yaml
    │    │   └── kustomization.yaml
    │    │
    │    ├── db-k8s/
    │    │   ├── mongo-deploy.yaml
    │    │   ├── mongo-service.yaml
    │    │   ├── mongo-pv.yaml
    │    │   ├── mongo-pvc.yaml
    │    │   └── kustomization.yaml
    │    ├── kind/
    │    │   └── config.yaml
    │    ├── networking/
    │    │   ├── network-policy.yaml
    │    │   ├── ingress.yaml
    │    │   └── README.md
    │    └──README.md   
    └── README.md
   

```