# BookVerse Kubernetes Setup

This project is **BookVerse Kubernetes Setup**, which defines the deployments, services, and storage for the **frontend**, **backend**, and **MongoDB database** of the BookVerse application. It follows a 3-tier architecture managed by **Kubernetes (K8s)**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Configuration Details](#configuration-details)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

---

## Project Overview

**BookVerse** is a 3-tier application consisting of:

- **Frontend**: A web interface built with HTML, JavaScript, and Bootstrap.
- **Backend**: An API server built with Node.js and Express, connected to MongoDB.
- **Database**: MongoDB for persistent book storage.

This Kubernetes setup defines deployments, services, and persistent storage for each tier, ensuring scalability, service discovery, and resilience.

---

## Features

- **Frontend Deployment & Service**:
  - Runs the BookVerse frontend container.
  - Exposes port `80` for external access.

- **Backend Deployment & Service**:
  - Runs the BookVerse backend container.
  - Exposes port `5000` for API requests.
  - Connects to MongoDB via the `mongo-service`.

- **MongoDB Deployment & Service**:
  - Runs MongoDB version `6.0`.
  - Exposes port `27017` for database connections.
  - Uses a **PersistentVolume (PV)** and **PersistentVolumeClaim (PVC)** for data persistence.

- **Kustomization Support**:
  - Each tier includes a `kustomization.yaml` for easy management and deployment.

---

## Technologies Used

- [Kubernetes](https://kubernetes.io/) for orchestration.
- [Docker](https://www.docker.com/) for containerization.
- **MongoDB 6.0** for database storage.
- **Node.js & Express** for backend API.
- **HTML, JavaScript, Bootstrap** for frontend UI.

---

## Configuration Details

### 🔹 Backend
- **Deployment**: `backend-deploy`
- **Service**: `backend`
- **Image**: `your-username/bookverse-backend:latest` (Update in the yaml file as well)
- **Port**: `5000`

### 🔹 Frontend
- **Deployment**: `frontend-deploy`
- **Service**: `frontend`
- **Image**: `your-username/bookverse-frontend:latest` (Update in the yaml file as well)
- **Port**: `80`

### 🔹 MongoDB
- **Deployment**: `mongo-deploy`
- **Service**: `mongo-service`
- **Image**: `mongo:6.0`
- **Port**: `27017`
- **Storage**:
  - **PersistentVolume (PV)**: `mongo-pv` (1Gi, hostPath `/data/mongo`)
  - **PersistentVolumeClaim (PVC)**: `mongo-pvc` (1Gi)

---

## Installation

### Prerequisites
- A running Kubernetes cluster.
- `kubectl` configured to access the cluster.
- NGINX Ingress Controller (if exposing frontend externally).

### Steps

1. **Start the kind cluster:**
    ```bash
    cd kind
    kind create cluster --name=cluster-01 --config=config.yaml
    ```
2. **Install Calico CNI:** Follow the instructions written in the ```README.md``` file inside the ```networking``` directory.

3. **Create ```bookverse``` namespace**:
   ```bash
   kubectl create namespace bookverse
   ```

4. **Apply MongoDB resources:**
   ```bash
   cd db-k8s
   kubectl kustomize . | kubectl apply -f-
   ```

5. **Apply Backend resources:**
    ```bash
    cd backend-k8s
    kubectl kustomize . | kubectl apply -f-
    ```

6. **Apply Frontend resources:**
    ```bash
    cd frontend-k8s
    kubectl kustomize . | kubectl apply -f-
    ```

7. **Verify deployments and services:**
    ```bash
    kubectl get pods -n bookverse
    kubectl get svc -n bookverse 
    ```
8. **Setup Ingress and NetworkPolicy:** Follow the instructions written in the ```README.md``` file inside the ```networking``` directory.

---

## Usage

- **Frontend:** Accessible via the frontend service (port 80).
- **Backend:** Accessible via the backend service (port 5000).
- **Database:** Accessible internally via the mongo-service (port 27017).

## Project Structure
```bash
    k8s/
    ├── backend/
    │   ├── backend-deploy.yaml       # Backend Deployment
    │   ├── backend-service.yaml      # Backend Service
    │   └── kustomization.yaml        # Backend kustomization
    │
    ├── frontend/
    │   ├── frontend-deploy.yaml      # Frontend Deployment
    │   ├── frontend-service.yaml     # Frontend Service
    │   └── kustomization.yaml        # Frontend kustomization
    │
    ├── mongo/
    │   ├── mongo-deploy.yaml         # MongoDB Deployment
    │   ├── mongo-service.yaml        # MongoDB Service
    │   ├── mongo-pv.yaml             # PersistentVolume
    │   ├── mongo-pvc.yaml            # PersistentVolumeClaim
    │   └── kustomization.yaml        # MongoDB kustomization
    ├── kind/
    │   └── config.yaml               # Config for kind cluster setup
    ├── networking/                   # Manifests related to ingress and network policy
    └── README.md                     # Documentation
```