# Loan Fusion

**Loan Fusion** is a monorepo that combines the **backend** and **frontend** of a loan management system. This project offers a seamless platform for managing loans, with a backend built using **Node.js**, **Express**, **PostgreSQL**, and **Prisma**, and a frontend developed using **React** and **Vite**.

This repository follows a monorepo structure to keep the backend and frontend projects in one place, making development, testing, and deployment more efficient.

---

## **Table of Contents**

- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Building the Projects](#building-the-projects)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## **Project Structure**

```
Loan-fusion/
│
├── backend/                # Backend service
│   ├── src/                # Source code
│   ├── dist/               # Compiled backend code
│   └── package.json
│
├── frontend/               # Frontend service
│   ├── src/                # Source code
│   ├── public/             # Public assets
│   └── package.json
│
├── .gitignore
├── README.md               # General README for the monorepo
└── .env.example            # Example environment variables
```

---

## **Features**

- **Backend**:

  - RESTful API using **Express.js**
  - **PostgreSQL** database with **Prisma** ORM
  - Centralized logging using **Winston**
  - Validation with **Joi**

- **Frontend**:
  - User-friendly UI built with **React** and **Ant Design**
  - State management with **Zustand**
  - API integration using **Axios**

---

## **Prerequisites**

Ensure the following are installed on your machine:

- **Node.js** (v18+)
- **npm** (v9+)
- **PostgreSQL** (for database setup)

---

## **Installation**

Clone the repository:

```bash
git clone <your-repo-url>
cd LoanFusion
```

Install dependencies for both **backend** and **frontend**:

```bash
# Navigate to backend folder
cd backend
npm install

# Navigate to frontend folder
cd ../frontend
npm install
```

---

## **Environment Setup**

1. Create `.env` files in both the **backend** and **frontend** directories based on their respective `.env.example` files.

### Example Backend `.env`:

```ini
DATABASE_URL=postgresql://postgres:password@localhost:5432/loan_db?schema=public
TEST_DATABASE_URL=postgresql://postgres:password@localhost:5432/loan_test_db?schema=public
NODE_ENV=development
PORT=3000
```

### Example Frontend `.env`:

```ini
VITE_API_BASE_URL=http://localhost:3000/api/loans
VITE_APP_BASE_URL=http://localhost:5173/assets
VITE_PRIMARY_COLOR="#FFAF00"
```

2. Ensure your PostgreSQL database is running and properly configured.

---

## **Running the Backend**

1. Navigate to the **backend** directory:

   ```bash
   cd backend
   ```

2. Start the backend server in development mode:
   ```bash
   npm run dev
   ```

The backend will be running at [http://localhost:3000](http://localhost:3000).

---

## **Running the Frontend**

1. Navigate to the **frontend** directory:

   ```bash
   cd ../frontend
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will be running at [http://localhost:5173](http://localhost:5173).

---

## **Building the Projects**

To create production builds for both backend and frontend:

### Backend Build:

```bash
cd backend
npm run build
```

### Frontend Build:

```bash
cd ../frontend
npm run build
```

The frontend build will be available in the `frontend/dist` folder, and the backend build will be in the `backend/dist` folder.

---

## **Testing**

### Backend Tests:

1. Navigate to the **backend** directory:

   ```bash
   cd backend
   ```

2. Run the tests using **Jest**:
   ```bash
   npm run test
   ```

---

## **Contributing**

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the project.

---

## **License**

This project is licensed under the **ISC License**.
