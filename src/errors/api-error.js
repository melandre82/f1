/**
 *
 */
class ApiError extends Error {
  /**
   * Represents an API error.
   *
   * @param {number} status - The status code of the error.
   * @param {string} [message] - The error message.
   */
  constructor (status, message = null) {
    super(message || ApiError.getDefaultMessage(status))
    this.status = status
  }

  /**
   * Get the default error message based on the status code.
   *
   * @param {number} status - The status code.
   * @returns {string} The default error message.
   */
  static getDefaultMessage (status) {
    switch (status) {
      case 400:
        return 'Bad request'
      case 401:
        return 'Unauthorized'
      case 403:
        return 'Forbidden'
      case 404:
        return 'Resource not found'
      case 500:
      default:
        return 'Internal server error'
    }
  }
}

export default ApiError
