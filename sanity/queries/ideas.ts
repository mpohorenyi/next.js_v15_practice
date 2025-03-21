import { defineQuery } from 'next-sanity';

const IDEAS_QUERY = defineQuery(`*[_type == "idea" && defined(slug.current)]
  | order(_createdAt desc) {
    'id': _id,
    title,
    'slug': slug.current,
    author -> {
      'id': _id,
      name,
      image,
      bio
    },
    views,
    summary,
    'category': category -> { title }.title,
    image,
    'createdAt': _createdAt,
  }[select(
    defined($search) => title match ('*' + $search + '*')
      || category match ('*' + $search + '*')
      || author.name match ('*' + $search + '*'),
    true
  )]`);

const IDEA_BY_SLUG_QUERY =
  defineQuery(`*[_type == "idea" && slug.current == $slug][0] {
    'id': _id,
    title,
    'slug': slug.current,
    author -> {
      'id': _id,
      name,
      image,
      username,
      bio
    },
    views,
    summary,
    'category': category -> { title }.title,
    image,
    'createdAt': _createdAt,
    content
}`);

const IDEA_VIEWS_BY_SLUG_QUERY =
  defineQuery(`*[_type == "idea" && slug.current == $slug][0] {
    'id': _id,
    views
}`);

export { IDEA_BY_SLUG_QUERY, IDEA_VIEWS_BY_SLUG_QUERY, IDEAS_QUERY };
