/**
 * @description A wrapper for async functions to catch errors and pass them to the next middleware.
 * @param {function} requestHandler - The async controller function.
 */

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

module.exports = asyncHandler;
