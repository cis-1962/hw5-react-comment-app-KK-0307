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
    <div className="bg-white p-4 rounded-lg shadow mt-4 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <button onClick={() => handleVote(1)} className="text-lg font-bold mr-2">&#9650;</button>
          <span className="text-lg">{post.votes}</span>
          <button onClick={() => handleVote(-1)} className="text-lg font-bold ml-2">&#9660;</button>
        </div>
        <span className="font-semibold">{post.name}</span>
      </div>
      <p className="text-lg mb-4">{post.text}</p>
      {post.depth < 3 && <PostForm onPostSubmit={handleReply} parentId={post.id} depth={post.depth + 1} />}
      <div className="ml-4">
        {replies.map((reply) => (
          <PostItem key={reply.id} post={reply} onReply={onReply} onVote={onVote} />
        ))}
      </div>
    </div>
  );
};

export default PostItem;
