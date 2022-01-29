import { checkPassword } from "../helpers/bcrypt-helper";
import { validateRefreshToken } from "../helpers/jwt-helper";
import { tokenModel } from "../schemas/auth-token-schema";
import { UserModel } from "../schemas/user-schema";

export const verifyPassword = async (user, password) => {
	return await checkPassword(password, user.password);
};

export const updateRefreshToken = async (id, token) => {
	try {
		const userToken = await tokenModel.findOne({ user: id });

		if (!userToken) return await tokenModel.create({ user: id, token });

		userToken.token = token;
		return await userToken.save();
	} catch (err) {
		throw err;
	}
};

export const verifyRefreshTokenAndGetUser = async (token, id) => {
	try {
		const isTokenValid = await validateRefreshToken(token);

		if (!isTokenValid) throw Error("Refresh Token Expired");

		const userToken = await tokenModel.findOne({ token: token });

		if (!userToken) throw Error("Refresh Token not Found");

		return await UserModel.findById(userToken.user);
	} catch (err) {
		throw err;
	}
};

export const getCleanedUser = (user) => {
	return { ...user.toObject(), password: undefined, __v: undefined };
};
