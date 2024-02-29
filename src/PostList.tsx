import React from 'react';
import PostItem from './PostItem';
import { Post } from './types';

interface PostListProps {
  posts: Post[];
  onReply: (reply: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onReply }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onReply={onReply} />
      ))}
    </div>
  );
};

export default PostList;
