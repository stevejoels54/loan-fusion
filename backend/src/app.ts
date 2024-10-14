import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { requestLogger, errorLogger } from "./app/middleware/loggerMiddleware";
import loanRoutes from "./app/routes/loanRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/loans", loanRoutes);

app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Loan Fusion");
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
