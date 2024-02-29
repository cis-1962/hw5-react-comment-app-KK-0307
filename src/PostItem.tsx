// PostItem.tsx
import React, { useState } from 'react';
import PostForm from './PostForm';
import { Post, PostProps } from './types';

interface PostItemProps extends PostProps {
  onVote: (id: number, delta: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onReply, onVote }) => {
  const [replies, setReplies] = useState<Post[]>([]);

  const handleReply = (reply: Post) => {
    setReplies([...replies, reply]);
    onReply(reply);
  };

  const handleVote = (delta: number) => {
    onVote(post.id, delta);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{post.name}</span>
        <div className="flex items-center">
          <button
            onClick={() => handleVote(1)}
            className="bg-green-200 hover:bg-green-300 text-green-800 rounded-full h-6 w-6 flex items-center justify-center mx-1"
          >
            &#9650;
          </button>
          <span>{post.votes}</span>
          <button
            onClick={() => handleVote(-1)}
            className="bg-red-200 hover:bg-red-300 text-red-800 rounded-full h-6 w-6 flex items-center justify-center mx-1"
          >
            &#9660;
          </button>
        </div>
      </div>
      <p className="mt-2 mb-4">{post.text}</p>
      {post.depth < 3 && <PostForm onPostSubmit={handleReply} parentId={post.id} depth={post.depth + 1} />}
      <div className="ml-4 mt-4">
        {replies.map((reply) => (
          <PostItem key={reply.id} post={reply} onReply={onReply} onVote={onVote} />
        ))}
      </div>
    </div>
  );
};

export default PostItem;
