import React, { useEffect, useState } from "react";
import styles from "./PostPage.module.css";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostComments from "./PostComments";
import { BrowserRouter as Router, Route, Routes, BrowserRouter, useParams } from 'react-router-dom';
import axios from "axios";


const PostDetail = () => {

    const {id} = useParams();
    const [post, setPost] = useState([]);

    const postUrl = `http://localhost:9999/posts/${id}`;
    
    useEffect(() => {
    (async () => {
      const response = await axios.get(postUrl);
      const data = response.data;
      setPost([...post, data]);
    })();
  }, []);
    return (
        <div className={styles.peeps}>
            <header className={styles.header}></header>
            {post.map((post) => (
            <div key={post.id}>
                <PostHeader
                    category={post.category}
                    title={post.title}
                    date={post.date}
                    nickname={post.user_nickname} />
                <PostContent 
                    text={post.text}/>
                <PostComments />
            </div>
        ))}
        </div>
    );
}

export default PostDetail; 