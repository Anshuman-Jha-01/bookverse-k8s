# BookVerse Network Policy & Ingress

This configuration defines the **NetworkPolicy** and **Ingress** resources for the **BookVerse** application, a 3-tier architecture deployed on **Kubernetes**. These resources ensure secure communication between internal services and expose the frontend to external users via a custom domain.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Configuration Details](#configuration-details)
- [Usage](#usage)
- [Project Structure](#project-structure)

---

## Project Overview

The **BookVerse** application is composed of three tiers: frontend, backend, and database (MongoDB). To ensure secure and controlled communication between these components, a **NetworkPolicy** is applied to restrict access to the MongoDB pod. Additionally, an **Ingress** resource is configured to expose the frontend service to the internet under the domain `bookverse.org`, using an NGINX Ingress Controller.

---

## Features

- **NetworkPolicy**:
  - Restricts MongoDB access to only the backend pods.
  - Ensures secure internal communication within the cluster.

- **Ingress**:
  - Routes external HTTP traffic to the frontend service.
  - Uses NGINX Ingress Controller with path rewriting.
  - Supports custom domain routing via `bookverse.org`.

---

## Technologies Used

- **Kubernetes** for container orchestration.
- **NGINX Ingress Controller** for HTTP routing.
- **NetworkPolicy API** for traffic control between pods.

---

## Configuration Details

### 🔐 NetworkPolicy: `backend-to-mongo`

- **Target Pod**: Pods with label `app: mongo`
- **Allowed Source**: Pods with label `app: backend`
- **Allowed Port**: TCP 27017 (default MongoDB port)
- **Policy Type**: Ingress only

This policy ensures that only the backend pods can initiate connections to the MongoDB service, enhancing internal security.

### 🌐 Ingress: `bookverse-ingress`

- **Ingress Class**: `nginx`
- **Hosts**: `bookverse.org` and `catch-all for localhost(testing)`
- **Paths & Routing**: 
    - `/` → forwards to frontend service on port 80
    - `/api/` → forwards to backend service on port 5000
- **Path Type:** Prefix (prefix-based routing with regex capture)
- **Annotations**:
  - `nginx.ingress.kubernetes.io/rewrite-target: /$1` — rewrites the request URI using regex capture groups before forwarding to the backend.

---

## Usage

1. **Install NGINX Ingress Controller:**
    ```bash 
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.14.0/deploy/static/provider/cloud/deploy.yaml
    ```

2. **Install Calico CNI for NetworkPolicy:**
    ```bash
    kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.30.4/manifests/calico.yaml
    ```

3. **Apply the NetworkPolicy and INgress Resource**:
   ```bash
   kubectl kustomize . | kubectl apply -f- 
   ```

4. **Port forwarding:** Use fort-forwarding for ingress nginx controller service to access the application.
    ```bash
    Kubectl port-forward service/ingress-nginx-controller -n ingress-nginx 8080:80 --address=0.0.0.0
    ```
    - Then open http://localhost:8080 in your browser.    

5. **If you haven’t set up DNS, but want to use the custom host, add to /etc/hosts:**
    ```bash
    127.0.0.1 bookverse.org
    ```
    - Then open http://bookverse.local:8080 in your browser.
---

## Project Structure

```bash
  networking/
    ├── network-policy.yaml     # NetworkPolicy for backend-to-mongo access
    ├── ingress.yaml            # Ingress resource for frontend exposure
    └── README.md               # Documentation for networking setup
  ```
