import NavBar from '../_components/NavBar';

type MainLayoutProps = Readonly<{ children: React.ReactNode }>;

function MainLayout({ children }: MainLayoutProps) {
  return (
    <main>
      <NavBar />

      {children}
    </main>
  );
}

export default MainLayout;
