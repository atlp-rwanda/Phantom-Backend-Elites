export const sendErrorResponse = (res, code, errorMessage, e = null) => res.status(code).json({
    status: 'error',
    error: errorMessage,
    e: e?.toString(),
});

export const sendSuccessResponse = (res, code, data, message = 'Successful') => res.status(code).json({
    status: 'success',
    data,
    message,
});
