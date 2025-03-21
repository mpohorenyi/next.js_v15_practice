import IdeaList from '@/components/IdeaList';
import SearchForm from '@/components/SearchForm';

import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { IDEAS_QUERY } from '@/sanity/queries/ideas';

interface HomePageProps {
  searchParams: Promise<{ query?: string }>;
}

async function HomePage({ searchParams }: HomePageProps) {
  const query = (await searchParams).query;

  const { data: ideas } = await sanityFetch({
    query: IDEAS_QUERY,
    params: { search: query ?? null },
  });

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

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Ideas'}
        </p>

        <IdeaList ideas={ideas} />
      </section>

      <SanityLive />
    </>
  );
}

export default HomePage;
