import CONFIG from "../config/config";
const API_ENDPOINT = {
  LOGIN: CONFIG.BASE_URL_API_LOGIN,
  HOME: `${CONFIG.BASE_URL_API_HOME}/home`,
  USER: `${CONFIG.BASE_URL_API_HOME}/user`,
  LOGOUT: `${CONFIG.BASE_URL_API_HOME}/logout`,
  REGISTER: `${CONFIG.BASE_URL_API}/register`,
  PROFIL_ID: (id) => `${CONFIG.BASE_URL_API_HOME}/profil/${id}`,
  FOLLOWER_ID: (id) => `${CONFIG.BASE_URL_API_HOME}/follow/${id}`,
  UNFOLLOW: (id) => `${CONFIG.BASE_URL_API_HOME}/unfollow/${id}`,
  FOLLOW: `${CONFIG.BASE_URL_API_HOME}/follow`,
  COMMENTPOST: `${CONFIG.BASE_URL_API_HOME}/comment-post`,
  LIKE_ID: (id) => `${CONFIG.BASE_URL_API_HOME}/like/${id}`,
  UNLIKE: (id) => `${CONFIG.BASE_URL_API_HOME}/unlike/${id}`,
  LIKE: `${CONFIG.BASE_URL_API_HOME}/like`,
  TOTAL_LIKE: (id) => `${CONFIG.BASE_URL_API_HOME}/like/${id}`,
  REGISTER_PROVIDER: (provider) => `${CONFIG.BASE_URL_API}/register/${provider}`,
  REPORT_LIST_ID: (id) => `${CONFIG.BASE_URL_API}/reports/${id}`,
  REPORT_DETAIL_ID: (id) => `${CONFIG.BASE_URL_API}/reports/${id}/data`,
  REPORT_DETAIL_DELETE: (id, reportId) =>
    `${CONFIG.BASE_URL_API}reports/${id}/data/${reportId}`,
};

export default API_ENDPOINT;
