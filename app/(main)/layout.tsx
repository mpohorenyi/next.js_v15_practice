import NavBar from '@/components/NavBar';
import { SanityLive } from '@/sanity/lib/live';

type MainLayoutProps = Readonly<{ children: React.ReactNode }>;

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <SanityLive />
    </>
  );
}

export default MainLayout;
