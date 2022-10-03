import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeNickname from "../components/user/ChangeNickname";
import MyReplies from "../components/user/MyReplies";
import styles from "../css/Mypage.module.css";

const Mypage = () => {
  //user정보 api로 부터 받아와서 props로 전달
  const [page, setPage] = useState("changeNickname");

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    nickname: "",
    replies: [],
  });

  useEffect(() => {
    fetch("http://43.200.119.175:8080/user/api/info", {
      headers: {
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setUserInfo(res.data);
        } else {
          alert("없는 회원입니다.");
          navigate("/");
        }
      });
  }, [navigate]);

  return (
    <div>
      <h1 className={styles.title}>My Page</h1>
      <div className={styles.body}>
        <div>
          <ul className={styles.list}>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setPage("changeNickname")}
            >
              닉네임 바꾸기
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setPage("myReplies")}
            >
              내가 쓴 댓글
            </li>
          </ul>
        </div>
        <div className={styles.subpage}>
          {
            {
              changeNickname: <ChangeNickname username={userInfo.nickname} />,
              myReplies: <MyReplies replies={userInfo.replies} />,
            }[page]
          }
        </div>
      </div>
    </div>
  );
};

export default Mypage;
