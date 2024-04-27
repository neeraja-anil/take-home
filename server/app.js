import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import ProjectRoutes from "./routes/projectRoutes.js";
import TodoRoutes from "./routes/todoRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import morgan from "morgan";

const app = express();

dotenv.config();
connectDB();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/projects", ProjectRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/todos", TodoRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
