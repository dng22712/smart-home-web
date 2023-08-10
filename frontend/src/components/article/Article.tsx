import React from 'react';
import './article.css';

type props ={
  imgUrl: string;
  date: string;
  text: string;
}

const Article = ({imgUrl, date, text}:props) => (
  <div className="gpt3__blog-container_article">
    <div className="gpt3__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="gpt3__blog-container_article-content">
      <div>
        <p>{date}</p>
        <h3>{text}</h3>
      </div>
      <p>Read the Blog</p>
    </div>
  </div>
);

export default Article;