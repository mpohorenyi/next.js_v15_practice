import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';
import slugify from 'slugify';

import { generateUniqueUsername } from './lib/utils';
import { client } from './sanity/lib/client';
import { writeClient } from './sanity/lib/write-client';
import { AUTHOR_BY_GOOGLE_ID_QUERY } from './sanity/queries/authors';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [google],
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile) return false;

      const { email, name, image } = user;
      const { sub } = profile;

      const existingAuthor = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          googleId: sub,
        });

      if (!existingAuthor) {
        const baseUsername = slugify(name ?? '', {
          replacement: '-',
          lower: true,
          strict: true,
        });

        const uniqueUsername = await generateUniqueUsername(baseUsername);

        await writeClient.create({
          _type: 'author',
          googleId: sub,
          name,
          username: uniqueUsername,
          email,
          image,
          bio: '',
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const author = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            googleId: profile.sub,
          });

        token.id = author?._id;
      }

      return token;
    },

    session({ session, token }) {
      Object.assign(session, { id: token.id });

      return session;
    },
  },
});
