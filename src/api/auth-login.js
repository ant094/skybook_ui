import API_ENDPOINT from './api-endpoint';
class AuthApi {
  static async login(email, password) {
      const data = {
        grant_type: "password",
        client_id: "1",
        client_secret: "PCm1Olxyj4JWtlxLC0RZhwWacjGcTZs9BbjRnXRx",
        username: email,
        password: password,
        scope: "",
      };

    const response = await fetch(API_ENDPOINT.LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson;
  }

  static async register(data){
      
     const response = await fetch(API_ENDPOINT.REGISTER, {
       method: "POST",
       body: JSON.stringify(data),
       headers: {
         "Content-Type": "application/json",
         "X-Requested-With": "XMLHttpRequest",
       },
     });
     const responseJson = await response.json();
     return responseJson;
  }
  static async logout(token){
      
     const response = await fetch(API_ENDPOINT.LOGOUT, {
       method: "POST",
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
         "X-Requested-With": "XMLHttpRequest",
       },
     });
     const responseJson = await response.json();
     return responseJson;
  }

  static async registerWithProvider(data, provider){
     const response = await fetch(API_ENDPOINT.REGISTER_PROVIDER(provider), {
       method: "POST",
       body: JSON.stringify(data),
       headers: {
         "Content-Type": "application/json",
         "X-Requested-With": "XMLHttpRequest",
       },
     });
     const responseJson = await response.json();
     return responseJson.success;
  }

  static async home() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson;
  }
}
export default AuthApi;


 // const handleRedirect = async (token) => {
      //   await fetch("http://127.0.0.1:8000/api/home", {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //     .then((response) => response.json())
      //     .then((result) => {
      //       console.log(result);
      //       setToken(result);
      //     })
      //     .catch((error) => {
      //       // common error
      //       console.log(error);
      //       return null;
      //     });
      // };