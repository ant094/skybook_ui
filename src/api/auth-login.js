import API_ENDPOINT from './api-endpoint';
class AuthApi {
  static async login(data) {
    const response = await fetch(API_ENDPOINT.LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const responseJson = await response.json();
    return responseJson;
  }
  static async home() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson;
  }
}
export default AuthApi;