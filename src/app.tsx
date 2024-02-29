import React, { useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import { Post } from './types';
import './index.css'; // Ensure Tailwind CSS is imported

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4">React Comment App</h1>
      <PostForm onPostSubmit={addPost} depth={0} />
      <PostList posts={posts} onReply={addPost} />
    </div>
  );
}

export default App;
