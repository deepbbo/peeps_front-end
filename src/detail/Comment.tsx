import React from 'react';

function Comment() {
  return (
    <>
      {/* <div className={styled.comment_list}>
        {dummy.comments.map(comment => (
          <div key={comment.id} className={styled.comment_item}>
            <div className={styled.comment_header}>
              <div style={{ display: 'flex' }}>
                <img src={comment.profileImgUrl} alt="프로필사진" />
                <span>{comment.author}</span>
                <button className="btn_more">
                  <span>더보기버튼</span>
                </button>
              </div>
            </div>
            <div className={styled.comment_content}>
              <p>{comment.text}</p>
            </div>
            <div className={styled.comment_footer}>
              <p>{comment.date}</p>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}

export default Comment;
