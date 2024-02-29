// PostForm.tsx
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
    if (!name || !text) return;

    const newPost: Post = {
      id: Date.now(),
      name,
      text,
      parentId,
      depth,
      votes: 0 // Initialize votes
    };
    onPostSubmit(newPost);
    setName('');
    setText('');
  };

  if (depth > 2) {
    return <p className="text-red-500">Replying not allowed beyond this level.</p>;
  }

  return (
    <div className={`${depth > 0 ? 'ml-4 mt-2' : 'mt-4'}`}>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
          className="border border-gray-300 p-2 rounded w-full mb-2"
          required
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a new post..."
          className="border border-gray-300 p-2 rounded w-full mb-2"
          required
        />
        <button
          type="submit"
          disabled={!name || !text}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
