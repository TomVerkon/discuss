import CommentList from '@/components/comments/comment-list';
import Link from 'next/link';
//import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentCreateForm from '@/components/comments/comment-create-form';
import PostShow from '@/components/post/post-show';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import paths from '@/paths';

interface PostShowPageProps {
  params: {
    topicSlug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { topicSlug, postId } = params;
  console.log('slug:', topicSlug);

  return (
    <div className='space-y-3'>
      <Link
        className='underline decoration-solid'
        href={paths.topicShow(topicSlug)}>
        {'< '}Back to {topicSlug}
      </Link>
      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
}
