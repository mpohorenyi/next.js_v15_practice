import { Lightbulb } from 'lucide-react';
import { defineField, defineType } from 'sanity';

import {
  IDEA_CONTENT_MIN_LENGTH,
  IDEA_SLUG_MAX_LENGTH,
  IDEA_SUMMARY_MAX_LENGTH,
  IDEA_SUMMARY_MIN_LENGTH,
  IDEA_TITLE_MAX_LENGTH,
  IDEA_TITLE_MIN_LENGTH,
} from '@/lib/constants';

const idea = defineType({
  name: 'idea',
  title: 'Idea',
  type: 'document',
  icon: Lightbulb,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => [
        rule.required().error('Title is required'),
        rule
          .min(IDEA_TITLE_MIN_LENGTH)
          .error(`Title must be at least ${IDEA_TITLE_MIN_LENGTH} characters`),
        rule
          .max(IDEA_TITLE_MAX_LENGTH)
          .error(
            `Title is too long. Max ${IDEA_TITLE_MAX_LENGTH} characters at most`,
          ),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: IDEA_SLUG_MAX_LENGTH,
      },
      validation: rule =>
        rule.required().error('Slug is required and must be unique'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: rule => rule.required().error('Author is required'),
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
      validation: rule =>
        rule.positive().error('Views must be a positive number'),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      validation: rule => [
        rule.required().error('Summary is required'),
        rule
          .min(IDEA_SUMMARY_MIN_LENGTH)
          .error(
            `Summary must be at least ${IDEA_SUMMARY_MIN_LENGTH} characters`,
          ),
        rule
          .max(IDEA_SUMMARY_MAX_LENGTH)
          .error(
            `Summary is too long. Max ${IDEA_SUMMARY_MAX_LENGTH} characters at most`,
          ),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: rule => rule.required().error('Category is required'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'url',
      validation: rule => rule.required().error('Image URL is required'),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'markdown',
      description: 'The main content of the idea in Markdown format',
      validation: rule =>
        rule
          .min(IDEA_CONTENT_MIN_LENGTH)
          .error(
            `Content should be at least ${IDEA_CONTENT_MIN_LENGTH} characters`,
          ),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
    },
  },
});

export { idea };
