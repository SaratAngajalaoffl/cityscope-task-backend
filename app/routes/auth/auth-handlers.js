import { getHashPassword } from "../../helpers/bcrypt-helper";
import { getAccessToken, getRefreshToken } from "../../helpers/jwt-helper";
import { sendErrorResponse, sendSuccessResponse } from "../../helpers/response-helper";
import { UserModel } from "../../schemas/user-schema";
import { getCleanedUser, updateRefreshToken, verifyPassword, verifyRefreshTokenAndGetUser } from "../../services/auth-services";

export const loginHandler = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		if (!user) return sendErrorResponse(res, { message: "No user found" }, "No user found");

		const isPasswordCorrect = await verifyPassword(user, password);

		if (!isPasswordCorrect) return sendErrorResponse(res, { message: "Password Incorrect" }, "Password Incorrect");

		const accessToken = getAccessToken({ id: user._id, type: user.type });

		const refreshToken = getRefreshToken();

		await updateRefreshToken(user._id, refreshToken);

		return sendSuccessResponse(res, { user: getCleanedUser(user), accessToken, refreshToken });
	} catch (err) {
		sendErrorResponse(res, { message: err.message }, "Something went wrong!");
	}
};

export const registerHandler = async (req, res) => {
	try {
		const { email, password } = req.body;

		const hash = await getHashPassword(password);

		const user = await UserModel.create({ email, password: hash });

		const accessToken = getAccessToken({ id: user._id, type: user.type });

		const refreshToken = getRefreshToken();

		await updateRefreshToken(user._id, refreshToken);

		return sendSuccessResponse(res, { user: getCleanedUser(user), accessToken, refreshToken });
	} catch (err) {
		if (err.code === 11000) return sendErrorResponse(res, { message: err.message }, "User Already Exists!");
		sendErrorResponse(res, { message: err.message }, "Something went wrong!");
	}
};

export const refreshHandler = async (req, res) => {
	try {
		const { refreshToken } = req.body;

		const user = await verifyRefreshTokenAndGetUser(refreshToken);

		const accessToken = getAccessToken({ id: user._id, type: user.type });

		return sendSuccessResponse(res, { user: getCleanedUser(user), accessToken });
	} catch (err) {
		sendErrorResponse(res, { message: err.message }, "Something went wrong!");
	}
};
