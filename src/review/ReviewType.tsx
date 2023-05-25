export interface ReviewType {
  review_id?: number;
  created_at: string;
  user_nickname: string;
  user_pic: string;
  review_content: string;
  review_img: string;
  star_rating: number;
  location_id?: string;
}
