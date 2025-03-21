import { after } from 'next/server';

import { formatViews } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';
import { IDEA_VIEWS_BY_SLUG_QUERY } from '@/sanity/queries/ideas';

interface ViewProps {
  slug: string;
}

const View = async ({ slug }: ViewProps) => {
  const data = await client
    .withConfig({ useCdn: false })
    .fetch(IDEA_VIEWS_BY_SLUG_QUERY, { slug });

  after(async () => {
    if (data) {
      await writeClient
        .patch(data.id)
        .set({
          views: (data.views ?? 0) + 1,
        })
        .commit();
    }
  });

  return (
    <div className="view-container">
      <div className="absolute -right-2 -top-2">
        <div className="relative">
          <div className="absolute -left-4 top-1">
            <span className="flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-primary" />
            </span>
          </div>
        </div>
      </div>

      <div className="view-text">
        <span className="font-black">{formatViews(data?.views)}</span>
      </div>
    </div>
  );
};

export default View;
