import express from "express";
import { validateInternalUser } from "../../helpers/jwt-helper";
import { commentBlogHandler } from "./blog-handlers";

import { createBlogHandler, editBlogHandler, getBlogHandler, getDashboardHandler, getDrafts, likeBlogHandler } from "./blog-handlers";

const router = express.Router();

router.post("/create-blog", validateInternalUser, createBlogHandler);
router.post("/edit-blog", validateInternalUser, editBlogHandler);
router.get("/get-drafts", validateInternalUser, getDrafts);
router.get("/get-blog", getBlogHandler);
router.get("/get-dashboard-data", getDashboardHandler);
router.get("/like-blog", likeBlogHandler);
router.post("/comment-blog", commentBlogHandler);

export default router;
