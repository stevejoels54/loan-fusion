# Backend Service

This is the backend service built with **Node.js**, **Express**, and **TypeScript**. It uses **Prisma ORM** for database interactions and follows a development workflow powered by **Jest** for testing and **Nodemon** for efficient development.

---

## **Table of Contents**

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Build for Production](#build-for-production)
- [Available Scripts](#available-scripts)

---

## **Prerequisites**

Make sure you have the following installed:

- **Node.js**: v18+
- **npm**: v9+
- **PostgreSQL**: Ensure PostgreSQL is installed and running
- **Prisma CLI**: Run `npm install prisma --global`

---

## **Environment Setup**

Create a `.env` file in the root directory based on the provided `.env.example`.

Example of `.env`:

```ini
DATABASE_URL="postgresql://postgres:password@localhost:5432/loan_db?schema=public"
TEST_DATABASE_URL="postgresql://postgres:password@localhost:5432/loan_test_db?schema=public"
NODE_ENV=development
PORT=3000
```

---

## **Installation**

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## **Database Setup**

1. Migrate the database schema using Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

2. To view your database schema in Prisma Studio:
   ```bash
   npx prisma studio
   ```

---

## **Running the Application**

1. Start the backend server in development mode:

   ```bash
   npm run dev
   ```

2. The server will start on the port specified in the `.env` file (default: `3000`).

3. To build the project and run in production:
   ```bash
   npm run build
   npm start
   ```

---

## **Running Tests**

Run the test suite using **Jest**:

```bash
npm test
```

For test coverage:

```bash
npx jest --coverage
```

---

## **Build for Production**

Compile TypeScript into JavaScript:

```bash
npm run build
```

The compiled files will be available in the `dist/` directory.

---

## **Available Scripts**

- **`npm run dev`**: Start the server in development mode using **Nodemon**
- **`npm run start`**: Run the server from compiled files in `dist/`
- **`npm run build`**: Compile TypeScript code to JavaScript
- **`npm test`**: Run tests using **Jest**

---

## **License**

This project is licensed under the ISC License.

---

## **Contributing**

Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements.

---

## **Author**

Joel Steven Ssekyewa
