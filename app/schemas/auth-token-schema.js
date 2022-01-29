import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
});

const tokenModel = mongoose.model("Token", tokenSchema);
export { tokenModel };
