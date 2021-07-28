import CONFIG from "../Config";
const API_ENDPOINT = {
  //Auth
  LOGIN: CONFIG.BASE_URL_API_LOGIN,
  LOGOUT: `${CONFIG.BASE_URL_API_HOME}/logout`,
  // Register
  REGISTER: `${CONFIG.BASE_URL_API}/register`,
  REGISTER_PROVIDER: (provider) =>
    `${CONFIG.BASE_URL_API}/register/${provider}`,
  NOTIFICATION: `${CONFIG.BASE_URL_API_HOME}/notification`,
  //Verify Email
  VERIFY_EMAIL: (id, hasEmail) =>
    `${CONFIG.BASE_URL_API}/email/verify/${id}/${hasEmail}`,
  // User
  USER: `${CONFIG.BASE_URL_API_HOME}/user`,
  PROFIL_ID: (id) => `${CONFIG.BASE_URL_API_HOME}/profil/${id}`,
  PROFIL_EDIT: (id) => `${CONFIG.BASE_URL_API_HOME}/profil-update/${id}`,

  //Home
  HOME: `${CONFIG.BASE_URL_API_HOME}/home`,

  // Follow & Unfollow
  FOLLOWER_ID: (id) => `${CONFIG.BASE_URL_API_HOME}/follow/${id}`,
  UNFOLLOW: (id) => `${CONFIG.BASE_URL_API_HOME}/unfollow/${id}`,
  FOLLOW: `${CONFIG.BASE_URL_API_HOME}/follow`,

  // Post
  POST_INPUT: `${CONFIG.BASE_URL_API_HOME}/post`,
  POST_SHOW_EDIT: (id) => `${CONFIG.BASE_URL_API_HOME}/post/${id}`,
  POST_EDIT: (id) => `${CONFIG.BASE_URL_API_HOME}/post-update/${id}`,
  DELETE_POST: (id) => `${CONFIG.BASE_URL_API_HOME}/post/${id}`,

  // Like & Unlike
  LIKE_ID: `${CONFIG.BASE_URL_API_HOME}/check-like`,
  UNLIKE: (id) => `${CONFIG.BASE_URL_API_HOME}/unlike/${id}`,
  LIKE: `${CONFIG.BASE_URL_API_HOME}/like`,
  TOTAL_LIKE: (id) => `${CONFIG.BASE_URL_API_HOME}/total-like/${id}`,

  // Comment
  TOTAL_COMMENT: (id) => `${CONFIG.BASE_URL_API_HOME}/total-comment/${id}`,
  DELETE_COMMENT: (postId) =>
    `${CONFIG.BASE_URL_API_HOME}/comment-post/${postId}`,
  COMMENT_POST_ID: (postId) =>
    `${CONFIG.BASE_URL_API_HOME}/comment-post-id/${postId}`,
  COMMENT_EDIT: (commentId) =>
    `${CONFIG.BASE_URL_API_HOME}/comment-post/${commentId}`,
  COMMENTPOST: `${CONFIG.BASE_URL_API_HOME}/comment-post`,
};

export default API_ENDPOINT;
