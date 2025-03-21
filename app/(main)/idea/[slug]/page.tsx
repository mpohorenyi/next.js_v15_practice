import markdownIt from 'markdown-it';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { IDEA_BY_SLUG_QUERY } from '@/sanity/queries/ideas';

const md = markdownIt();

interface IdeaPageProps {
  params: Promise<{ slug: string }>;
}

async function IdeaPage({ params }: IdeaPageProps) {
  const { slug } = await params;

  const idea = await client.fetch(IDEA_BY_SLUG_QUERY, { slug });

  if (!idea) {
    return notFound();
  }

  const parsedContent = md.render(idea.content ?? '');

  return (
    <>
      <section className="primary_container !min-h-[240px]">
        <p className="tag">{formatDate(idea.createdAt)}</p>
        <h1 className="heading">{idea.title}</h1>
        <p className="sub-heading !max-w-5xl">{idea.summary}</p>
      </section>

      <section className="section_container">
        <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            fill
            src={idea.image ?? '/default-image.png'}
            alt={idea.title ?? ''}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="mx-auto mt-10 max-w-4xl space-y-5">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${idea.author?.id}`}
              className="mb-3 flex items-center gap-2"
            >
              <Image
                src={idea.author?.image ?? '/default-avatar.png'}
                alt={idea.author?.name ?? ''}
                width={64}
                height={64}
                className="avatar"
              />

              <div>
                <p className="text-20-medium">{idea.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{idea.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{idea.category}</p>
          </div>

          <h3 className="text-30-bold">Idea Details</h3>

          {parsedContent ? (
            <article
              className="prose max-w-4xl break-all font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {/* TODO: Add editor selected ideas */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View slug={slug} />
        </Suspense>
      </section>
    </>
  );
}

export default IdeaPage;
