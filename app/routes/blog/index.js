import express from "express";
import { validateInternalUser } from "../../helpers/jwt-helper";

import { createBlogHandler, editBlogHandler, getBlogHandler, getDashboardHandler, getDrafts } from "./blog-handlers";

const router = express.Router();

router.post("/create-blog", validateInternalUser, createBlogHandler);
router.post("/edit-blog", validateInternalUser, editBlogHandler);
router.get("/get-blog", getBlogHandler);
router.get("/get-dashboard-data", getDashboardHandler);
router.get("/get-drafts", getDrafts);

export default router;
