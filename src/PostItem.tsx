import React, { useState } from 'react';
import PostForm from './PostForm';
import { Post } from './types';

interface PostProps {
  post: Post;
  onReply: (reply: Post) => void;
}

const PostItem: React.FC<PostProps> = ({ post, onReply }) => {
  const [replies, setReplies] = useState<Post[]>([]);

  const addReply = (reply: Post) => {
    setReplies([...replies, reply]);
  };

  return (
    <div className="border border-gray-300 p-4 rounded bg-white">
      <p className="mb-2">{post.text} - <span className="font-semibold">{post.name}</span></p>
      <PostForm onPostSubmit={addReply} parentId={post.id} depth={post.depth + 1} />
      {replies.length > 0 && (
        <div className="mt-4 ml-4 border-l-2 border-gray-200 pl-4">
          {replies.map((reply) => (
            <PostItem key={reply.id} post={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostItem;
