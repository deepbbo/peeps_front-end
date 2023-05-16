import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from "./PostPage.module.css";
import { Link, Outlet } from 'react-router-dom';

// console.log("피드")
const PostFeed = () => {
    const [posts, setPosts] = useState([]);

    const postsUrl = "http://localhost:9999/posts";

    useEffect(() => {
    (async () => {
      const response = await axios.get(postsUrl);
      const data = response.data;
      setPosts([...posts, ...data]);
    })();
  }, []);

    return <>
    <div className={styles.peeps}>
        <ul>
        {posts.map((post) => (
            <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
        ))}
        </ul>
    </div>
    </>;
}

export default PostFeed;