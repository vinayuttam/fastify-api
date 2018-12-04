const UserSchemaFragment = {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  email: { type: 'string' },
};

const UserSchema = {
  authentication: {
    input: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
    success: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  },
  input: {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'password'],
    properties: {
      ...UserSchemaFragment,
      password: { type: 'string' },
    }
  },
  success: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      ...UserSchemaFragment,
    },
  },
};

module.exports = UserSchema;
