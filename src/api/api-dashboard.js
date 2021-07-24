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
  static async isLikeById(post_id, token) {
    const data = {
      post_id: post_id,
    };
    const response = await fetch(API_ENDPOINT.LIKE_ID, {
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
  static async inputPost(caption, image) {
    const formData = new FormData();
    formData.append("caption", caption ?? "");
    formData.append("image", image);
    const response = await fetch(API_ENDPOINT.POST_INPUT, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json;",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const responseJson = await response.json();
    return responseJson;
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
    const response = await fetch(API_ENDPOINT.LIKE, {
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

  static async totalLike(postId, token) {
    const response = await fetch(API_ENDPOINT.TOTAL_LIKE(postId), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }
  static async totalComment(postId, token) {
    const response = await fetch(API_ENDPOINT.TOTAL_COMMENT(postId), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }
  static async getHome(token) {
    const response = await fetch(API_ENDPOINT.HOME, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson;
  }
  static async loadCommentByPostId(postId, token) {
    const response = await fetch(API_ENDPOINT.COMMENT_POST_ID(postId), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }

  static async inputComment(postId, commentText, token) {
    const data = {
      post_id: postId,
      comment: commentText,
    };
    const response = await fetch(API_ENDPOINT.COMMENTPOST, {
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

  static async deleteComment(commentId, token) {
    const response = await fetch(API_ENDPOINT.DELETE_COMMENT(commentId), {
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
  static async deletePost(postId, token) {
    const response = await fetch(API_ENDPOINT.DELETE_POST(postId), {
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
  static async editComment(postId, commentData) {
    const data = {
      comment: commentData,
    };
    const response = await fetch(API_ENDPOINT.COMMENT_EDIT(postId), {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }

  static async getNotification() {
    const response = await fetch(API_ENDPOINT.NOTIFICATION, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }

  static async postShowEdit(postId) {
    const response = await fetch(API_ENDPOINT.POST_SHOW_EDIT(postId), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const responseJson = await response.json();
    return responseJson.success;
  }
  static async postEdit(postId, caption , image) {

    
 const formData = new FormData();
 formData.append("caption", caption );
 formData.append("image", image );

    const response = await fetch(API_ENDPOINT.POST_EDIT(postId), {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
