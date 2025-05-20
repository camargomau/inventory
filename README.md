# Inventory Management Web Application

## Overview

This project is a full-stack web application for managing inventories. It allows users to add, view, update, delete, and restore products in real time, as well as export inventory data as PDF reports. The system is designed for efficiency and ease of use, supporting user authentication and role-based access.

## Technologies Used

- **Frontend:** React (Vite, Mantine UI)
- **Backend:** Java Spring Boot (REST API)
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker (multi-stage builds)
- **Other:** jsPDF (PDF export), Axios (HTTP requests)

## Quick Start (Docker)

To run the entire application (frontend, backend, and database) with a single command, use Docker Compose. Make sure you have Docker and Docker Compose installed.

```sh
docker compose up --build
```

This will build and start all services. The frontend will be available at [http://localhost:80](http://localhost:80) and the backend API at [http://localhost:8080](http://localhost:8080).

## Folder Structure

- **backend/**: Contains all backend code, including API endpoints, security, database entities, and configuration. Built with Java Spring Boot.
- **frontend/**: Contains the React application for the user interface, including components, hooks, and utilities.
- **docs/**: Contains LaTeX files aand diagrams for the project report and technical documentation (in Spanish).
