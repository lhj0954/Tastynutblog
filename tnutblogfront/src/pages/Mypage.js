import React, { useState } from "react";
import ChangeUsername from "../components/ChangeUsername";
import Mycomments from "../components/Mycomments";
import styles from "../css/Mypage.module.css";

const Mypage = () => {
  //user정보 api로 부터 받아와서 props로 전달
  const [page, setPage] = useState("changeUsername");

  return (
    <div>
      <h1 className={styles.title}>My Page</h1>
      <div className={styles.body}>
        <div>
          <ul className={styles.list}>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setPage("changeUsername")}
            >
              닉네임 바꾸기
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setPage("myComments")}
            >
              내가 쓴 댓글
            </li>
          </ul>
        </div>
        <div className={styles.subpage}>
          {
            {
              changeUsername: <ChangeUsername />,
              myComments: <Mycomments />,
            }[page]
          }
        </div>
      </div>
    </div>
  );
};

export default Mypage;
