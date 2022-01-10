import React, { useState } from "react";

const PostForm = ({
  subject,
  setSubject,
  selectedImage,
  setSelectedImage,
  caption,
  setCaption,
  handleSubmitPost,
}) => {
  return (
    <form onSubmit={handleSubmitPost} className="post-form">
      <label>Post subject</label>
      <input
        className="subjectInput"
        type="text"
        placeholder="Enter post subject..."
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <label>Image</label>
      <input
        type="file"
        value={selectedImage}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label className="captionLabel">Caption</label>
      <input
        className="captionInput"
        type="text"
        placeholder="Enter caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
};

export default PostForm;
