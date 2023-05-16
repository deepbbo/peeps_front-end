import React from "react";
import Comment from "./Comment";
import PostCommentInput from "./PostCommentInput";
import styles from "./PostComments.module.css";

function PostComments(){
    return <>
    <div>
        <div className={styles.comment_header}>
            <span>댓글 N</span>
        </div>
        <Comment />
    </div>
    <PostCommentInput />
    </>
}

export default PostComments;