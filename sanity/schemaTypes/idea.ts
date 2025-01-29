import { defineField, defineType } from 'sanity';

const idea = defineType({
  name: 'idea',
  title: 'Idea',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'views',
      type: 'number',
    }),
    defineField({
      name: 'summary',
      type: 'text',
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: Rule =>
        Rule.min(1).max(20).required().error('Please enter a category'),
    }),
    defineField({
      name: 'image',
      type: 'url',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'markdown',
    }),
  ],
});

export { idea };
