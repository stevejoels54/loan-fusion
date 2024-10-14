# Frontend Application

This is a frontend project built with **React** and **Vite**, using **TypeScript** for type safety. It leverages popular UI libraries like **Ant Design**, **Bootstrap**, and **Zustand** for state management.

---

## **Table of Contents**

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Linting](#linting)
- [Previewing the Production Build](#previewing-the-production-build)
- [Available Scripts](#available-scripts)

---

## **Prerequisites**

Make sure the following tools are installed on your machine:

- **Node.js**: v18+
- **npm**: v9+

---

## **Environment Setup**

1. Create a `.env` file in the root directory based on the `.env.example` file.

Example `.env`:

```ini
VITE_API_BASE_URL=http://localhost:3000/api/loans
VITE_APP_BASE_URL=http://localhost:5173/assets
VITE_PRIMARY_COLOR="#FFAF00"
```

2. Ensure the backend service is up and running on port **3000** (or the one specified in `VITE_API_BASE_URL`).

---

## **Installation**

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

---

## **Running the Application**

Start the development server:

```bash
npm run dev
```

The application will run on [http://localhost:5173](http://localhost:5173). Any changes in the code will automatically reload the browser.

---

## **Building for Production**

To create a production build:

```bash
npm run build
```

The build output will be available in the `dist/` directory.

---

## **Linting**

To run **ESLint** and check for code issues:

```bash
npm run lint
```

---

## **Previewing the Production Build**

To preview the production build locally:

```bash
npm run preview
```

The preview server will run on [http://localhost:4173](http://localhost:4173) by default.

---

## **Available Scripts**

- **`npm run dev`**: Start the development server
- **`npm run build`**: Build the project for production
- **`npm run lint`**: Run ESLint to check for code issues
- **`npm run preview`**: Preview the production build locally

---

## **License**

This project is licensed under the ISC License.

---

## **Contributing**

Feel free to open issues or submit pull requests for bug fixes or new features.

---

## **Author**

Joel Steven Ssekyewa
