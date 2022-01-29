export const sendSuccessResponse = (res, data, message = "Success") => {
	return res.status(200).json({
		data: data,
		status: true,
		message: message,
	});
};

export const sendErrorResponse = (res, errors, message = "Something Went Wrong", status = 406) => {
	console.log(errors);
	return res.status(status).json({
		data: errors,
		status: false,
		message: message,
	});
};

export const sendEmptyResponse = (res, data) => {
	return res.status(204).json({
		data: data,
		status: false,
		message: "No Data",
	});
};
