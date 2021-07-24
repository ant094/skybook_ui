import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { ReactContext } from "../../routes";
import "./home.css";
import { NavigasiTop } from "./navigasi-component/NavigasiTop";
import { PostInput } from "./post-component/PostInput";
import { Post } from "./post-component/Post";
import CONFIG from "../../config/config";
import DashboardApi from "../../api/api-dashboard";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
export const Home = () => {
   const { id } = useParams();
   const [show, setShow] = useState(false);
   const [profilData, setProfilData] = useState(null);
  const [postUpdate, setPostUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeId, setEditModeId] = useState(false);
   const [emailVerify, setEmailVerify] = useState(false);

const handlePostDelete = ()=>{
  setPostUpdate(postUpdate ? false : true);
}
const handleEditMode = (id) =>{
setEditMode(true);
setEditModeId(id);
}

    const loadPosts = (data, token) => {
      return data?.posts.map((data) => (
        <Post
          key={data.id}
          token={token}
          data={data}
          editMode={handleEditMode.bind(handleEditMode)}
          delete={handlePostDelete.bind(handlePostDelete)}
          profilData={profilData}
        />
      ));
      // console.log(data["0"])
      // for (let index = 0; index < data.length; index++) {
      //  return (
      //    <Post
      //      key={data[`${index}`].id}
      //      token={token}
      //      data={data[`${index}`]}
      //    />
      //  );
      // }
    };

  const MySwal = withReactContent(Swal);
    if (emailVerify) {
      MySwal.fire({
        title: <p>Mohon Verifikasi Email Terlebih Dahulu!</p>,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        icon: "warning",
      });
    }

   useEffect(() => {
     async function fetchData() {
       let data = await DashboardApi.getHome(localStorage.getItem('token'));
       console.log(data);
       if (data?.message === "Your email address is not verified.") {
         setEmailVerify(true);
       }
       return setProfilData(data.success);
     }
     fetchData();
   }, [id, postUpdate]);
  return (
    <ReactContext.Consumer>
      {(value) => {
       const localStorageToken = value.state.token;
       if (!localStorageToken) {
         return <Redirect to="/" />;
       }
        return (
          <>
            <NavigasiTop data={profilData} />
            <div id="main" className=" mt-3">
              <PostInput
                data={profilData}
                closeEditMode={()=>setEditMode(false)}
                editMode={editMode}
                editModeId={editModeId}
                updateInputPost={() => setPostUpdate(postUpdate ? false : true) }
              />
              {profilData && loadPosts(profilData, value.state.token)}
            </div>
          </>
        );
      }}
    </ReactContext.Consumer>
  );
};
