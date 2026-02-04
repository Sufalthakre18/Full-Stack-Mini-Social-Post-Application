import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import PaginationComp from "../components/PaginationComp";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (pageNumber = 1) => {
    const data = await apiRequest(`/posts?page=${pageNumber}`);

    if (data.posts) {
      setPosts(data.posts);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } else {
      // fallback if backend returns array
      setPosts(data);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  return (
    <>
      <CreatePost onPostCreated={handlePostCreated} />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onUpdate={handlePostUpdate}
        />
      ))}

      <PaginationComp
        page={page}
        totalPages={totalPages}
        onChange={(p) => fetchPosts(p)}
      />
    </>
  );
}
