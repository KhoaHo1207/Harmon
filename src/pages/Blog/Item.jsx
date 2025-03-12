import React from "react";

function Item({ post }) {
  return (
    <div key={post.id} className="mb-5 rounded-lg border px-10 py-7 shadow-md">
      <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm">👀 {post.views} Views</span>
        <span className="text-sm">❤️ {post.likes} Likes</span>
      </div>
    </div>
  );
}

export default Item;
