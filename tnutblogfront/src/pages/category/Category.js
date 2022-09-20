import React, { useEffect, useState } from "react";
import SideBar from "../../components/admin/SideBar";
import UserSideBar from "../../components/user/UserSideBar";

const Category = () => {
  const [largeCategories, setLargeCategories] = useState([]);

  const [authority, setAuthority] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authority"))) {
      setAuthority(JSON.parse(localStorage.getItem("authority")).role);
    }
  }, [authority]);

  useEffect(() => {
    fetch("http://localhost:8080/category")
      .then((res) => res.json())
      .then((res) => {
        setLargeCategories(res.data); //공백에 가져온 정보로 채워줌
      });
  }, []);

  return (
    <div>
      {authority === "ROLE_TNUT" ? (
        <SideBar largeCategories={largeCategories} />
      ) : (
        <></>
        //<UserSideBar largeCategories={largeCategories.data} />
      )}
    </div>
  );
};

export default Category;
