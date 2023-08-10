import React from 'react';
import Article from '../../components/article/Article';
import './blog.css';

import blog01 from '/src/assets/blog01.png'
import blog02 from '/src/assets/blog02.png'
import blog03 from '/src/assets/blog03.png'
import blog04 from '/src/assets/blog04.png'
import blog05 from '/src/assets/blog05.png'


const Blog = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">A lot is happening, <br /> We are blogging about it.</h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Article imgUrl={blog01} date="Mar 05, 2021" text="Write something here!!!!" />
      </div>
      <div className="gpt3__blog-container_groupB">
        <Article imgUrl={blog02} date="Mar 05, 2023" text="Write something here!!!!" />
        <Article imgUrl={blog03} date="Mar 05, 2023" text="Write something here!!!!" />
        <Article imgUrl={blog04} date="Mar 05, 2023" text="Write something here!!!!" />
        <Article imgUrl={blog05} date="Mar 05, 2023" text="Write something here!!!!" />

      </div>
    </div>
  </div>
);

export default Blog;