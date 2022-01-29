import bcrypt from "bcrypt";

const getHashPassword = async (userPassword, saltRounds = 10) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(userPassword, salt, (err, hash) => {
				if (err) reject("Error in password hashing");
				else {
					resolve(hash);
				}
			});
		});
	});
};

const checkPassword = async (userPassword, hashPassword) => {
	return await bcrypt.compare(userPassword, hashPassword);
};

export { getHashPassword, checkPassword };
