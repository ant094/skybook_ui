import API_ENDPOINT from "./api-endpoint";
class DashboardApi {
    static async getDataProfilById(id, token) {
       const response = await fetch(API_ENDPOINT.PROFIL_ID(id), {
         headers: {
           Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
             "X-Requested-With": "XMLHttpRequest",
         },
       });
       const responseJson = await response.json();
       return responseJson;
  };
}
export default DashboardApi;

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
