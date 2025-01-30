import SearchForm from '@/components/SearchForm';

interface HomePageProps {
  searchParams: Promise<{ query?: string }>;
}

async function HomePage({ searchParams }: HomePageProps) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="primary_container">
        <p className="tag">Create, Share, and Grow</p>

        <h1 className="heading">
          Share Ideas, <br /> Spark Big Innovations
        </h1>

        <p className="sub-heading !max-w-3xl">
          Share Your Ideas, Vote on Inspiring Visions, and Shine in the World of
          Innovation
        </p>

        <SearchForm query={query} />
      </section>
    </>
  );
}

export default HomePage;
