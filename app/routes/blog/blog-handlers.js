import { sendErrorResponse, sendSuccessResponse } from "../../helpers/response-helper";
import { aggregateBlogs, createNewBlog, getBlog, updateBlog } from "../../services/blog-services";

export const createBlogHandler = async (req, res) => {
	try {
		const data = await createNewBlog(req.user._id, req.body.city, req.body.category);
		sendSuccessResponse(res, data);
	} catch (err) {
		sendErrorResponse(res, err);
	}
};

export const editBlogHandler = async (req, res) => {
	try {
		const data = await updateBlog(req.query.blogId, { title: req.body.title, body: req.body.body, isDraft: req.body.isDraft });
		sendSuccessResponse(res, data);
	} catch (err) {
		sendErrorResponse(res, err);
	}
};

export const getBlogHandler = async (req, res) => {
	try {
		const data = await getBlog(req.query.blogId);
		sendSuccessResponse(res, data);
	} catch (err) {
		sendErrorResponse(res, err);
	}
};

export const getDashboardHandler = async (req, res) => {
	try {
		const data = await aggregateBlogs([{ $match: { isDraft: false } }]);
		sendSuccessResponse(res, data);
	} catch (err) {
		sendErrorResponse(res, err);
	}
};

export const getDrafts = async (req, res) => {
	try {
		const data = await aggregateBlogs([{ $match: { isDraft: true } }]);
		sendSuccessResponse(res, data);
	} catch (err) {
		sendErrorResponse(res, err);
	}
};