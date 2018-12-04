const ErrorSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'string' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
};

module.exports = ErrorSchema;
