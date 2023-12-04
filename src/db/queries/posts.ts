import { db } from '@/db';
import type { Post } from '@prisma/client';

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export function fetchPostsByTopicSlug(
  topicSlug: string
): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug: topicSlug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
