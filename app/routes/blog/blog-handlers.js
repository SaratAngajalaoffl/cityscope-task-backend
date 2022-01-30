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
		const { city,categories } = req.query

		
		const data = await aggregateBlogs([{ $match: { isDraft: false, city, category: { $in : categories } } }]);
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

export const likeBlogHandler = async (req, res) => {
	try {
		const blog = await getBlog(req.query.blogId);

		var likes = blog.likes || [];

		let ind = likes.indexOf(req.user.id);

		if (ind > -1) likes.pop(ind);
		else likes.push(req.user.id);

		blog.likes = likes;

		await blog.save();

		console.log(blog);

		sendSuccessResponse(res, blog);
	} catch (err) {
		sendErrorResponse(res, err);
	}
};

export const commentBlogHandler = async (req, res) => {
	try {

		const {comment} = req.body

		const {blogId} = req.query

		const {id: userId} = req.user

		const blog = await getBlog(req.query.blogId);

		var comments = blog.comments || [];

		comments.push({
			owner: userId,
			comment: comment,
		});

		blog.comments = comments;

		await blog.save();

		console.log(blog);

		sendSuccessResponse(res, blog);
	} catch (err) {
		sendErrorResponse(res, err);
	}
};