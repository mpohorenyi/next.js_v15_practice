import NavBar from '@/components/NavBar';

type MainLayoutProps = Readonly<{ children: React.ReactNode }>;

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
