import { defineQuery } from 'next-sanity';

const AUTHOR_BY_GOOGLE_ID_QUERY =
  defineQuery(`*[_type == "author" && googleId == $googleId][0] {
    _id,
    googleId,
    name,
    username,
    email,
    image,
    bio
  }`);

export { AUTHOR_BY_GOOGLE_ID_QUERY };
