import React, { useState } from "react";
import UserManagement from "../../components/UserManagement";
import styles from "../../css/ManagerPage.module.css";

const ManagerPage = () => {
  const [page, setPage] = useState("userManagement");

  return (
    <div>
      <h1 className={styles.title}>Management Page</h1>
      <div className={styles.body}>
        <div>
          <ul className={styles.list}>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setPage("userManagement")}
            >
              회원 관리
            </li>
          </ul>
        </div>
        <div className={styles.subpage}>
          {
            {
              userManagement: <UserManagement />,
            }[page]
          }
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
