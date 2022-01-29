import mongoose from "mongoose";

import { CITIES } from "../helpers/city-helper";

const BLOG_CATEGORIES = ["Employment", "Tourism", "Culture", "Finance", "Housing"];

const BlogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			default: "",
		},
		body: {
			type: String,
			default: "",
		},
		owner: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		likes: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
			},
		],
		city: {
			type: String,
			enum: CITIES,
			requried: true,
		},
		category: {
			type: String,
			enum: BLOG_CATEGORIES,
			required: true,
		},
		comments: [
			{
				owner: {
					type: mongoose.Types.ObjectId,
					ref: "User",
				},
				comment: {
					type: String,
				},
				likes: [
					{
						type: mongoose.Types.ObjectId,
						ref: "User",
					},
				],
			},
		],
		isDraft: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const BlogModel = mongoose.model("Blog", BlogSchema);
export { BlogModel };
