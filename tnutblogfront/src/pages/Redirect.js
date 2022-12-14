import React, { useEffect } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import { host } from "../variation.js";

const Redirect = () => {
  const navigate = useNavigate();

  const token = queryString.parse(window.location.search); //yarn add query-string

  useEffect(() => {
    if (token) {
      localStorage.setItem("Tnut's accessToken", token.accessToken);
      localStorage.setItem("Tnut's refreshToken", token.refreshToken);

      fetch("http://" + host + ":8080/authority", {
        headers: {
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("authority", JSON.stringify(res.data));
        });

      setInterval(() => {
        //로그인 시 29분 간격으로 accessToken 재발급
        fetch("http://" + host + ":8080/refresh", {
          //access토큰이 만료되었을 경우
          method: "post",
          headers: {
            "Content-Type": "applicaiton/json; charset=utf-8",
            RefreshToken: localStorage.getItem("Tnut's refreshToken"),
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("Tnut's accessToken", res.data); //access토큰을 새로 발급
            } else if (res.status === 401) {
              clearInterval(setInterval); //refreshToken 만료 시 재발급 중지
              alert("로그인 만료, 재 로그인 해주세요");
            }
          });
      }, 1000 * 60 * 29);

      setTimeout(() => {
        //google, kakao는 문제 없으나 naver는 반응이 느리게 옴
        window.location.href = `/`;
      }, 500);
    } else {
      navigate(-1);
    }
  });

  return <div></div>;
};

export default Redirect;
