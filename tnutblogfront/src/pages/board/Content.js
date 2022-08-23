import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import ReplyItem from "../../components/ReplyItem";
import AdminReplyItem from "../../components/AdminReplyItem";
import styles from "../../css/Content.module.css";

const Content = () => {
  const propsParam = useParams();
  const id = propsParam.id;
  const navigate = useNavigate();

  const [authority, setAuthority] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authority")) {
      //authority라는 값이 있으면
      setAuthority(JSON.parse(localStorage.getItem("authority")).role);
    }
  }, [authority]);

  const [board, setBoard] = useState({
    //처음에 공백
    data: [],
    status: "",
  });

  const [replyList, setReplyList] = useState([]);

  const [reply, setReply] = useState({
    board_id: id,
    content: "",
  });

  const [subCategoryName, setSubCategoryName] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/board/" + id) //id를 통해서 게시판 정보를 가져옴
      .then((res) => res.json())
      .then((res) => {
        setBoard(res); //공백에 가져온 정보로 채워줌
        setSubCategoryName(res.data.subCategory);
        setReplyList(res.data.replies);
      });
  }, [id]);

  const deleteBoard = () => {
    //해당 게시글 삭제
    fetch("http://localhost:8080/admin/api/board/" + id + "/delete", {
      method: "DELETE",
      headers: {
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "success delete!") {
          navigate("/");
        } else {
          alert("삭제 실패");
        }
      });
  };

  const updateBoard = () => {
    //함수 updateBoard 실행되면 /update/id로 이동
    navigate("/board/updateForm/" + id);
  };

  const changeValue = (e) => {
    setReply((reply) => ({
      ...reply,
      content: e.target.value,
    }));
  };

  const submitReply = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/user/api/reply/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
      body: JSON.stringify(reply),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          window.location.reload();
        } else {
          alert("댓글 등록 실패!");
        }
      });
  };

  return (
    <div>
      <br />
      <Link
        to="/categoryPage"
        style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
        title="카테고리 별 게시글 페이지로 이동합니다."
      >
        Category: {subCategoryName.subCategoryName}
      </Link>
      <br />
      <br />
      <div className={styles.contentTop}>
        <h1 style={{ margin: "0" }}>{board.data.title}</h1>
        {authority === "ROLE_TNUT" ? (
          <div className={styles.utilButton}>
            <Button variant="secondary" onClick={() => updateBoard()}>
              수정
            </Button>{" "}
            <Button variant="secondary" onClick={() => deleteBoard()}>
              삭제
            </Button>{" "}
            <Button variant="secondary" onClick={() => navigate(-1)}>
              돌아가기
            </Button>
          </div>
        ) : (
          <div className={styles.utilButton}>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              돌아가기
            </Button>
          </div>
        )}
      </div>
      <hr />
      <Card>
        <Card.Body>{board.data.content}</Card.Body>
      </Card>
      <hr />
      <InputGroup className="mb-3">
        <Form.Control
          type="reply"
          onChange={changeValue}
          name="reply"
          placeholder="댓글을 입력하세요"
        />
        {authority ? (
          <>
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={submitReply}
            >
              댓글 등록
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline-secondary" id="button-addon2" disabled>
              로그인 해주세요
            </Button>
          </>
        )}
      </InputGroup>
      <hr />
      <>
        {replyList.map((comment) => {
          if (authority === "ROLE_TNUT") {
            return <AdminReplyItem key={comment.id} comment={comment} />;
          } else {
            return <ReplyItem key={comment.id} comment={comment} />;
          }
        })}
      </>
    </div>
  );
};

export default Content;
