import { UserIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

import {
  AUTHOR_BIO_MAX_LENGTH,
  AUTHOR_BIO_MIN_LENGTH,
  AUTHOR_NAME_MAX_LENGTH,
  AUTHOR_NAME_MIN_LENGTH,
  AUTHOR_USERNAME_MAX_LENGTH,
  AUTHOR_USERNAME_MIN_LENGTH,
} from '@/lib/constants';
import { validateUniqueField } from '@/lib/validations';

const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'number',
      validation: rule => rule.required().error('Id is required'),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => [
        rule.required().error('Name is required'),
        rule
          .min(AUTHOR_NAME_MIN_LENGTH)
          .error(`Name must be at least ${AUTHOR_NAME_MIN_LENGTH} characters`),
        rule
          .max(AUTHOR_NAME_MAX_LENGTH)
          .error(
            `Name is too long. Max ${AUTHOR_NAME_MAX_LENGTH} characters at most`,
          ),
      ],
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: rule => [
        rule
          .min(AUTHOR_USERNAME_MIN_LENGTH)
          .error(
            `Username must be at least ${AUTHOR_USERNAME_MIN_LENGTH} characters`,
          ),
        rule
          .max(AUTHOR_USERNAME_MAX_LENGTH)
          .error(
            `Username is too long. Max ${AUTHOR_USERNAME_MAX_LENGTH} characters at most`,
          ),
        rule.custom(async (username, context) =>
          validateUniqueField({
            fieldValue: username,
            documentId: context.document?._id,
            fieldName: 'username',
            documentType: 'author',
            errorMessage: 'Username must be unique',
          }),
        ),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: rule => [
        rule.email().error('Enter a valid email'),
        rule.required().error('Email is required'),
        rule.custom(async (email, context) =>
          validateUniqueField({
            fieldValue: email,
            documentId: context.document?._id,
            fieldName: 'email',
            documentType: 'author',
            errorMessage: 'User with this email already exists',
          }),
        ),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Avatar',
      type: 'url',
      validation: rule => rule.required().error('Image URL is required'),
    }),
    defineField({
      name: 'bio',
      title: 'BIO',
      type: 'text',
      validation: rule => [
        rule
          .min(AUTHOR_BIO_MIN_LENGTH)
          .error(`BIO should be at least ${AUTHOR_BIO_MIN_LENGTH} characters`),
        rule
          .max(AUTHOR_BIO_MAX_LENGTH)
          .error(
            `BIO is too long. Max ${AUTHOR_BIO_MAX_LENGTH} characters at most`,
          ),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
});

export { author };
