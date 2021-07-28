import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { ReactContext } from "../../../routes";
import { NavigasiTop } from "../../../Components/Navigasi/NavigasiTop";
import { PostInput } from "../../../Components/Dashboard/PostInput";
import { Post } from "../../../Components/Dashboard/Post";
import DashboardApi from "../../../Api/api-dashboard";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
export const Home = () => {
   const { id } = useParams();
   const [profilData, setProfilData] = useState(null);
  const [postUpdate, setPostUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeId, setEditModeId] = useState(false);
   const [emailVerify, setEmailVerify] = useState(false);
  const token = localStorage.getItem("token");
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
          <>
          {!token && <Redirect to="/" />}
            <NavigasiTop data={profilData} />
            <div id="main" className=" mt-3">
              {profilData && <PostInput
                data={profilData}
                closeEditMode={()=>setEditMode(false)}
                editMode={editMode}
                editModeId={editModeId}
                updateInputPost={() => setPostUpdate(postUpdate ? false : true) }
              />}
              {profilData && loadPosts(profilData, token)}
            </div>
          </>
        );
};
