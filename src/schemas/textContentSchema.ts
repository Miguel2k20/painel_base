export const textContentSchema = {
  create: {
    body: {
      type: 'object',
      required: [
        'slug',
        'name',
        'title',
        'subtitle',
        'description',
        'link'
      ],
      properties: {
        slug: { type: 'string', maxLength: 255 },
        name: { type: 'string', maxLength: 255 },
        title: { type: 'string', maxLength: 255 },
        subtitle: { type: 'string', maxLength: 255 },
        description: { type: 'string' },
        link: { type: 'string', maxLength: 255 }
      }
    }
  },

  update: {
    body: {
      type: 'object',
      properties: {
        slug: { type: 'string', maxLength: 255 },
        name: { type: 'string', maxLength: 255 },
        title: { type: 'string', maxLength: 255 },
        subtitle: { type: 'string', maxLength: 255 },
        description: { type: 'string' },
        link: { type: 'string', maxLength: 255 }
      }
    }
  }
}
