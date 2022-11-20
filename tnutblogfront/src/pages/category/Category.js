import React, { useEffect, useState } from "react";
import SideBar from "../../components/admin/SideBar";
import UserSideBar from "../../components/user/UserSideBar";
import { host } from "../../variation.js";

const Category = () => {
  const [largeCategories, setLargeCategories] = useState([]);

  const [authority, setAuthority] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authority"))) {
      setAuthority(JSON.parse(localStorage.getItem("authority")).role);
    }
  }, [authority]);

  useEffect(() => {
    fetch("http://" + host + ":8080/category")
      .then((res) => res.json())
      .then((res) => {
        setLargeCategories(res.data.largeCategoryList); //공백에 가져온 정보로 채워줌
      });
  }, []);

  return (
    <div>
      {authority === "ROLE_TNUT" ? (
        <SideBar largeCategories={largeCategories} />
      ) : (
        <UserSideBar largeCategories={largeCategories} />
      )}
    </div>
  );
};

export default Category;
