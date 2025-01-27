import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = async () => {
  const session = await auth();

  const handleSingIn = async () => {
    'use server';
    await signIn('google');
  };

  const handleSingOut = async () => {
    'use server';
    await signOut({ redirectTo: '/' });
  };

  return (
    <header className="bg-white px-5 py-3 shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image priority src="/logo.png" alt="Logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/article/create">
                <span>Create</span>
              </Link>

              <form action={handleSingOut}>
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session.user.id ? session.user.id : ''}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form action={handleSingIn}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
