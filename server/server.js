import express from "express";
const app = express();
import cors from "cors";
const PORT = 5000;
import db from "./models/index.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import ProjectRoutes from "./routes/projectRoutes.js";
import TodoRoutes from "./routes/todoRoutes.js";
import UserRoutes from "./routes/userRoutes.js";

app.use(cors());
app.use(express.json());

app.get("/api/home", (req, res) => {
  res.send("api running...");
});
app.use("/api/projects", ProjectRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/todos", TodoRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
