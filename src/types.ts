export interface Post {
    id: number;
    name: string;
    text: string;
    parentId: number | null;
    depth: number;
  }
  
  export interface PostProps {
    post: Post;
    onReply: (reply: Post) => void;
  }
  