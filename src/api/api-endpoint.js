import CONFIG from "../config/config";
const API_ENDPOINT = {
  LOGIN : CONFIG.BASE_URL_API_LOGIN,
  HOME: `${CONFIG.BASE_URL_API}/home`,
  LOGOUT: `${CONFIG.BASE_URL_API_HOME}/logout`,
  REGISTER: `${CONFIG.BASE_URL_API}/register`,
  REGISTER_PROVIDER:(provider)=> `${CONFIG.BASE_URL_API}register/${provider}`,
  REPORT_LIST_ID: (id) => `${CONFIG.BASE_URL_API}reports/${id}`,
  REPORT_DETAIL_ID: (id) => `${CONFIG.BASE_URL_API}reports/${id}/data`,
  REPORT_DETAIL_DELETE: (id, reportId) =>
    `${CONFIG.BASE_URL_API}reports/${id}/data/${reportId}`,
};

export default API_ENDPOINT;
