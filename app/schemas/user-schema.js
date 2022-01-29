import mongoose from "mongoose";

const USER_TYPES = ["INTERNAL", "EXTERNAL"];

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: USER_TYPES,
		default: "EXTERNAL",
	},
});

const UserModel = mongoose.model("User", UserSchema);
export { UserModel };
