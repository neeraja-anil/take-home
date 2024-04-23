import express from "express";
import cors from "cors";
import db from "./models/index.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import ProjectRoutes from "./routes/projectRoutes.js";
import TodoRoutes from "./routes/todoRoutes.js";
import UserRoutes from "./routes/userRoutes.js";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/projects", ProjectRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/todos", TodoRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
