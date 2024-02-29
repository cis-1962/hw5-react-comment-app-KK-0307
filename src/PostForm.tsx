import React, { useState } from 'react';
import { Post } from './types';

interface PostFormProps {
  onPostSubmit: (post: Post) => void;
  parentId?: number | null;
  depth: number;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSubmit, parentId = null, depth }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && text) {
      const newPost: Post = { id: Date.now(), name, text, parentId, depth };
      onPostSubmit(newPost);
      setName('');
      setText('');
    }
  };

  if (depth > 2) {
    return <p className="text-red-500">Replying not allowed beyond this level.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="border border-gray-300 p-2 rounded mb-2 w-full"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your Comment"
        className="border border-gray-300 p-2 rounded mb-2 w-full"
      />
      <button
        type="submit"
        disabled={!name || !text}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
