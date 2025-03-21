import { client } from '@/sanity/lib/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: number | string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatViews(views: number | undefined | null) {
  if (!views) return 'No views yet';

  return views > 1 ? `${views} views` : `${views} view`;
}

export async function generateUniqueUsername(
  baseUsername: string,
): Promise<string> {
  let username = baseUsername;
  let existingCount;

  do {
    existingCount = await client
      .withConfig({ useCdn: false })
      .fetch<number>(`count(*[_type == "author" && username == $username])`, {
        username,
      });

    if (existingCount > 0) {
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      username = `${baseUsername}-${randomSuffix}`;
    }
  } while (existingCount > 0);

  return username;
}
