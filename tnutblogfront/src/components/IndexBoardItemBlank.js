import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../css/IndexBoardItem.module.css";

const IndexBoardItemBlank = () => {
  const [authority, setAuthority] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authority")) {
      //authority라는 값이 있으면
      setAuthority(JSON.parse(localStorage.getItem("authority")).role);
    }
  }, [authority]);

  return (
    <>
      <Card border="secondary" style={{ width: "18rem", marginRight: "30px" }}>
        <Card.Header>빈 페이지 입니다.</Card.Header>
        <Card.Body className={styles.cardBody}>
          <div className={styles.cardWrap}>
            <Card.Title>비어있음</Card.Title>
            <hr />
            <Card.Text className={styles.cardText}>비어있음</Card.Text>
            <div>
              {authority === "ROLE_TNUT" ? (
                <>
                  <Link
                    to={"/board/saveForm/"}
                    className="btn btn-secondary"
                    style={{ float: "right" }}
                  >
                    글쓰러가기
                  </Link>
                </>
              ) : (
                <>
                  {/* <Link
                    to={"/board/saveForm/"}
                    className="btn btn-secondary"
                    style={{ float: "right", pointerEvents: "none" }}
                  >
                    글쓰러가기
                  </Link> */}
                </>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default IndexBoardItemBlank;
