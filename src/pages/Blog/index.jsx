import React, { useEffect, useState } from "react";
import { getBlogs } from "../../services/blogService";

function Blog() {
  const [blos, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getBlogs();
      setBlogs(response.item);
      setTotalPages(response.totalPages);
      setSize(response.size);
      setCurrentPage(response.page);
      console.log(response);
    };
    fetchData();
  }, []);
  return <div>Blog</div>;
}

export default Blog;
