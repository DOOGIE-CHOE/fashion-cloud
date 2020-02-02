const code = require('../config/code');

const errorHandler = {};

errorHandler.createError = (errorCode) => {
  const error = new Error();
  if (code.ERROR_CODE.NOT_FOUND === errorCode) {
    error.message = 'Not Found';
    error.statusCode = code.STATUS_CODE.NOT_FOUND;
    error.errorCode = code.ERROR_CODE.NOT_FOUND;
  }
  return error;
};

module.exports = errorHandler;
