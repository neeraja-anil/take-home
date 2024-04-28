import { app } from "./app.js";
import connectDB from "./config/db.js";

const PORT = 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
