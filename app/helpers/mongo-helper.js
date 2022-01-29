import mongoose from "mongoose";

const connectDB = () => {
	mongoose
		.connect(process.env.MONGODB_URL)
		.then(() => {
			console.log("Connected to database successfully!");
		})
		.catch((err) => {
			console.log("Database connection error", err);
		});
};

export default connectDB;
