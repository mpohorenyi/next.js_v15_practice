import { Tag } from 'lucide-react';
import { defineField, defineType } from 'sanity';

import {
  CATEGORY_DESCRIPTION_MAX_LENGTH,
  CATEGORY_DESCRIPTION_MIN_LENGTH,
  CATEGORY_TITLE_MAX_LENGTH,
  CATEGORY_TITLE_MIN_LENGTH,
} from '@/lib/constants';
import { validateUniqueField } from '@/lib/validations';

const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => [
        rule.required().error('Title is required'),
        rule
          .min(CATEGORY_TITLE_MIN_LENGTH)
          .error(
            `Title must be at least ${CATEGORY_TITLE_MIN_LENGTH} characters`,
          ),
        rule
          .max(CATEGORY_TITLE_MAX_LENGTH)
          .error(
            `Title is too long. Max ${CATEGORY_TITLE_MAX_LENGTH} characters at most`,
          ),
        rule.custom(async (title, context) =>
          validateUniqueField({
            fieldValue: title,
            documentId: context.document?._id,
            fieldName: 'title',
            documentType: 'category',
            errorMessage: 'Title must be unique',
          }),
        ),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: CATEGORY_TITLE_MAX_LENGTH,
      },
      validation: rule =>
        rule.required().error('Slug is required and must be unique'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: rule => [
        rule
          .min(CATEGORY_DESCRIPTION_MIN_LENGTH)
          .error(
            `Description should be at least ${CATEGORY_DESCRIPTION_MIN_LENGTH} characters`,
          ),
        rule
          .max(CATEGORY_DESCRIPTION_MAX_LENGTH)
          .error(
            `Description is too long. Max ${CATEGORY_DESCRIPTION_MAX_LENGTH} characters at most`,
          ),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});

export { category };
