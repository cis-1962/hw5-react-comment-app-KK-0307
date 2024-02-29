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
    <div className={`post-item ${post.depth === 0 ? 'mb-4' : 'ml-4 my-2'}`}>
      <div className="voting-buttons">
        <button onClick={() => handleVote(1)} className="text-lg font-bold mr-2">&#9650;</button>
        <span className="text-lg">{post.votes}</span>
        <button onClick={() => handleVote(-1)} className="text-lg font-bold ml-2">&#9660;</button>
      </div>
      <div className="post-content">
        <div className="post-header mb-2">
          <span className="font-semibold">{post.name}</span>
        </div>
        <p className="text-lg mb-4">{post.text}</p>
        {post.depth === 0 && <PostForm onPostSubmit={handleReply} parentId={post.id} depth={post.depth + 1} />}
        <div className="replies">
          {replies.map((reply) => (
            <PostItem key={reply.id} post={reply} onReply={onReply} onVote={onVote} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
