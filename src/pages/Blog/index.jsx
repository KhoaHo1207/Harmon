import React, { useEffect, useState } from "react";
import { getBlogs } from "../../services/blogService";
import Item from "./Item";

function Blog() {
  const [blog, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getBlogs();
      setBlogs(response.items);
      setTotalPages(response.totalPages);
      setSize(response.size);
      setCurrentPage(response.page);
      console.log(response);
    };
    fetchData();
  }, []);
  return (
    <div className="mx-auto mt-10 max-w-3xl">
      {blog &&
        blog.length > 0 &&
        blog.map((post) => <Item key={post.id} post={post} />)}
    </div>
  );
}

export default Blog;
