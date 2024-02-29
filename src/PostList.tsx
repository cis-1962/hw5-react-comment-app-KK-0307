// PostList.tsx
import React from 'react';
import PostItem from './PostItem';
import { Post } from './types';

interface PostListProps {
  posts: Post[];
  onReply: (reply: Post) => void;
  onVote: (id: number, delta: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onReply, onVote }) => {
  return (
    <div>
      {posts.filter(post => post.parentId === null).map((post) => (
        <PostItem key={post.id} post={post} onReply={onReply} onVote={onVote} />
      ))}
    </div>
  );
};

export default PostList;
