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
  }
  static async isFollowerById(user_follower_id, token) {
    const response = await fetch(API_ENDPOINT.FOLLOWER_ID(user_follower_id), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson;
  }
  static async isLikeById(like_id, token) {
    const response = await fetch(API_ENDPOINT.LIKE_ID(like_id), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson;
  }
  static async postFollow(userFollowerId, token) {
    const data = {
      user_follower_id: userFollowerId,
    };
    const response = await fetch(API_ENDPOINT.FOLLOW, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }
  static async deleteUnfollow(userFollowerId, token) {
    const response = await fetch(API_ENDPOINT.UNFOLLOW(userFollowerId), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }
  static async unlike(postId, token) {
    const response = await fetch(API_ENDPOINT.UNLIKE(postId), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }
  static async like(postId, token) {
    const data = {
      post_id: postId,
    };
    const response = await fetch(API_ENDPOINT.like, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }
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
