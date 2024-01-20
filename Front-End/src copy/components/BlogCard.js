import React from "react";
import { Link } from "react-router-dom";

function BlogCard() {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" alt="blog" className="img-fluid w-100" />
      </div>
      <div className="blog-content">
        <p className="date">15 March, 2023</p>
        <h5 className="title">A beautiful sunday morning renaissance </h5>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat
          accusamus officia
        </p>
        <Link className="button" to="">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
