import express from "express";
import { validateUser } from "../helpers/jwt-helper";
import authRoutes from "./auth";
import blogRoutes from "./blog";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/blogs", validateUser, blogRoutes);

export default router;
