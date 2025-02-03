import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/lib/utils';
import { IDEAS_QUERYResult } from '@/sanity/types';

interface IdeaCardProps {
  idea: IDEAS_QUERYResult[number];
}

const IdeaCard = ({ idea }: IdeaCardProps) => {
  const { createdAt, views, author, title, category, slug, image, summary } =
    idea;

  return (
    <li className="idea-card group">
      <div className="flex-between">
        <p className="idea-card_date">{formatDate(createdAt)}</p>

        <div className="flex items-center gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?.id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>

          <Link href={`/idea/${slug}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${author?.id}`}>
          <Image
            src={author?.image ?? '/default-avatar.png'}
            alt={`${author?.name} avatar`}
            width={48}
            height={48}
            className="avatar"
          />
        </Link>
      </div>

      <Link href={`/idea/${slug}`}>
        <p className="idea-card_desc">{summary}</p>

        <div className="idea-card_img-container">
          <Image
            fill
            src={image ?? '/default-image.png'}
            className="idea-card_img"
            alt={`Image for "${title}" article`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium"> {category}</p>
        </Link>

        <Link href={`/idea/${slug}`} className="idea-card_btn">
          Details
        </Link>
      </div>
    </li>
  );
};

export default IdeaCard;
