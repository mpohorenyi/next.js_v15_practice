import NextAuth from 'next-auth';
import google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [google],
});
