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
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name..."
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="text" className="text-sm font-medium text-gray-700">Post</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What are your thoughts?"
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!name || !text}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
