import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import accountRoutes from "./routes/accountRoutes";
import destiationRoutes from "./routes/destinationRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { apiLimiter } from "./middlewares/rateLimiter";
import dataHandlerRoutes from "./routes/dataHandlerRoutes";
import memberRoutes from "./routes/accountMemberRoutes";
import logRoutes from "./routes/logRoutes";

let app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(apiLimiter);


app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);
app.use('/destination',destiationRoutes)
app.use('/server',dataHandlerRoutes)
app.use('/accountMember',memberRoutes)
app.use('/logs',logRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`The App is listening on port ${PORT}`);
  });
}).catch(error => {
  console.error("Failed to connect to database:", error);
  process.exit(1);
});