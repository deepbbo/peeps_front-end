import React from "react";
import "./PostHeader.css";

const PostHeader = ({category, title, date, nickname}) => {
    return <>
    <div className="title_component">
        <div className="tit_menu">
            <div className="post_category">
                {category}
            </div>
            <div className="aside_layer">
                <img alt="더보기아이콘" src={process.env.PUBLIC_URL+'/icon/more-info.svg'}></img>
            </div>
        </div>
        <div className="user_wrap">
            <div className="profile-picture"><img alt="프로필사진" src={process.env.PUBLIC_URL+'/icon/profile.svg'}></img></div>
            <div className="info">
                <div className="nickname">
                    {nickname}
                </div>
            </div>
            <div className="info">
                <div className="date">
                    {date}
                </div>
                <div className="comment-count">
                    댓글수
                </div>
            </div>
            <div>
            <button type="button" className="btn_comments">
                <img alt="댓글아이콘" src={process.env.PUBLIC_URL+'/icon/comment.svg'}></img>
            </button>
        </div>
        </div>
        
        <div className="post_title">
            <div className="tit">
                {title}
            </div>
        </div>
    </div>
    </>
}

export default PostHeader;