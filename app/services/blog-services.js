import { BlogModel } from "../schemas/blog-schema";

export const createNewBlog = async (user, city, category) => {
	return await BlogModel.create({ owner: user, city, category });
};

export const updateBlog = async (blogId, edits) => {
	return await BlogModel.findByIdAndUpdate(blogId, edits, { new: true });
};

export const getBlog = async (blogId) => {
	return await BlogModel.findById(blogId);
};

export const aggregateBlogs = async (pipeline = []) => {
	return await BlogModel.aggregate([...pipeline, { $sort: { createdAt: -1 } }]);
};
