import { type SchemaTypeDefinition } from 'sanity';

import { author } from './author';
import { category } from './category';
import { idea } from './idea';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, category, idea],
};
