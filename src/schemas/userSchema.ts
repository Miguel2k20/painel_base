export const userSchema = {
  create: {
    body: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
      }
    }
  },

  update: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        active: { type: 'boolean' }
      },
      additionalProperties: false
    }
  },

  list: {
    response: {
      200: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          users: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                email: { type: 'string' },
                active: { type: 'boolean' }
              }
            }
          }
        }
      }
    }
  }
}
