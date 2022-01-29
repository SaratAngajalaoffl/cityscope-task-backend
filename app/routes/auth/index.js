import express from "express";

import { loginHandler, refreshHandler, registerHandler } from "./auth-handlers";

const router = express.Router();

router.post("/login", loginHandler);
router.post("/register", registerHandler);
router.post("/refresh", refreshHandler);

export default router;
