import React from "react";
import styles from "./PostContent.module.css";

function PostContent({text}){

    // const [content, setContent] = useState();
    
    return <>
    <div className={styles.post_body}>
        {text}
    </div>
    </>
}

export default PostContent;