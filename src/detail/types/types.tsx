// export interface UserTypes {
//   user_id, user_name, user_password, user_nickname, user_location, user_img
// }

export interface PostTypes {
  post_id: number;
  user_img: string | null;
  user_id: string;
  user_nickname: string;
  post_category: string;
  post_title: string;
  post_content: string;
  post_img: string | null;
  comment_count: number;
  created_at: string;
  comments: {
    comment_id: number;
    user_img: string | null;
    user_nickname: string;
    comment_content: string;
    created_at: string;
  }[];
}

export interface CommentTypes {
  comment_id: number;
  user_img: null | string;
  user_nickname: string;
  user_id: string;
  comment_content: string;
  created_at: string;
}
