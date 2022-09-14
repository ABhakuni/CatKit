import express from "express";
import morgan from "morgan";
import cors from "cors";

// routes
import catKitRoutes from "./routes/catkit.routes.js";

// Initialization
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/catkit", catKitRoutes);

// Error Handling
app.use((req, res) => {
  res.status(404).send("Not Found");
});

export default app;
