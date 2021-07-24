import API_ENDPOINT from './api-endpoint';
class AuthApi {
 
  static async login(email, password) {
    const data = {
      grant_type: "password",
      client_id: "1",
      client_secret: "Okm8zLeKPI1FPVivzJMuacvfgdz3ATdrvN1UZtzi",
      // client_secret: "MaH5CwOxZbYqLGQ6210zZhr0ou1OBK24Qi6DLg9k",
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

  static async register(data) {
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
  static async logout(token) {
    const response = await fetch(API_ENDPOINT.LOGOUT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }

  static async verifyEmail(id, hasEmail, token) {
    const response = await fetch(API_ENDPOINT.VERIFY_EMAIL(id, hasEmail), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson;
  }

  static async registerWithProvider(data, provider) {
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
  static async editProfil(id, fileImage, data, token) {
    const formData = new FormData();
    formData.append("image", fileImage);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("deskripsi", data.deskripsi ?? "");
    const response = await fetch(API_ENDPOINT.PROFIL_EDIT(id), {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json;",
        Authorization: `Bearer ${token}`,
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
  static async user(token) {
    const response = await fetch(API_ENDPOINT.USER, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
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