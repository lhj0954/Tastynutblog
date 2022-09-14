import React, { useEffect, useState } from "react";
import SideBar from "../../components/admin/SideBar";
import UserSideBar from "../../components/user/UserSideBar";

const Category = () => {
  const [largeCategory, setLargeCategory] = useState({
    stasus: "",
    data: [],
  });

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
        setLargeCategory(res); //공백에 가져온 정보로 채워줌
      });
  }, []);

  return (
    <div>
      {authority === "ROLE_TNUT" ? (
        <SideBar data={largeCategory.data} />
      ) : (
        <UserSideBar data={largeCategory.data} />
      )}
    </div>
  );
};

export default Category;
