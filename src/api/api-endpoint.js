import CONFIG from "../config/config";
const API_ENDPOINT = {
  LOGIN: CONFIG.BASE_URL_API_LOGIN,
  HOME: `${CONFIG.BASE_URL_API_HOME}/home`,
  USER: `${CONFIG.BASE_URL_API_HOME}/user`,
  LOGOUT: `${CONFIG.BASE_URL_API_HOME}/logout`,
  REGISTER: `${CONFIG.BASE_URL_API}/register`,
  NOTIFICATION: `${CONFIG.BASE_URL_API_HOME}/notification`,
  PROFIL_ID: (id) => `${CONFIG.BASE_URL_API_HOME}/profil/${id}`,
  VERIFY_EMAIL: (id, hasEmail) =>
    `${CONFIG.BASE_URL_API}/email/verify/${id}/${hasEmail}`,
  PROFIL_EDIT: (id) => `${CONFIG.BASE_URL_API_HOME}/profil-update/${id}`,
  FOLLOWER_ID: (id) => `${CONFIG.BASE_URL_API_HOME}/follow/${id}`,
  POST_INPUT: `${CONFIG.BASE_URL_API_HOME}/post`,
  POST_SHOW_EDIT: (id) => `${CONFIG.BASE_URL_API_HOME}/post/${id}`,
  POST_EDIT: (id) => `${CONFIG.BASE_URL_API_HOME}/post-update/${id}`,
  UNFOLLOW: (id) => `${CONFIG.BASE_URL_API_HOME}/unfollow/${id}`,
  DELETE_POST: (id) => `${CONFIG.BASE_URL_API_HOME}/post/${id}`,
  COMMENT_POST_ID: (postId) =>
    `${CONFIG.BASE_URL_API_HOME}/comment-post-id/${postId}`,
  COMMENT_EDIT: (commentId) =>
    `${CONFIG.BASE_URL_API_HOME}/comment-post/${commentId}`,
  FOLLOW: `${CONFIG.BASE_URL_API_HOME}/follow`,
  COMMENTPOST: `${CONFIG.BASE_URL_API_HOME}/comment-post`,
  LIKE_ID: `${CONFIG.BASE_URL_API_HOME}/check-like`,
  UNLIKE: (id) => `${CONFIG.BASE_URL_API_HOME}/unlike/${id}`,
  LIKE: `${CONFIG.BASE_URL_API_HOME}/like`,
  TOTAL_LIKE: (id) => `${CONFIG.BASE_URL_API_HOME}/total-like/${id}`,
  TOTAL_COMMENT: (id) => `${CONFIG.BASE_URL_API_HOME}/total-comment/${id}`,
  REGISTER_PROVIDER: (provider) =>
    `${CONFIG.BASE_URL_API}/register/${provider}`,
  REPORT_LIST_ID: (id) => `${CONFIG.BASE_URL_API}/reports/${id}`,
  REPORT_DETAIL_ID: (id) => `${CONFIG.BASE_URL_API}/reports/${id}/data`,
  REPORT_DETAIL_DELETE: (id, reportId) =>
    `${CONFIG.BASE_URL_API}reports/${id}/data/${reportId}`,

  DELETE_COMMENT: (postId) =>
    `${CONFIG.BASE_URL_API_HOME}/comment-post/${postId}`,
};

export default API_ENDPOINT;
