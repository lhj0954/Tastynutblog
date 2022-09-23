import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import ReplyItem from "../../components/user/ReplyItem";
import AdminReplyItem from "../../components/admin/AdminReplyItem";
import styles from "../../css/Content.module.css";
import "../../css/Content.css";

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
  }, []);

  const [board, setBoard] = useState({
    //처음에 공백
    title: "",
    content: "",
    subCategoryName: "",
    replies: [],
  });

  const [reply, setReply] = useState({
    //댓글 작성 정보
    board_id: id,
    content: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/board/" + id) //id를 통해서 게시판 정보를 가져옴
      .then((res) => res.json())
      .then((res) => {
        setBoard(res.data); //공백에 가져온 정보로 채워줌
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
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          alert("삭제 성공");
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
    if (reply.content.length === 0) {
      alert("빈 댓글을 등록할 수 없습니다.");
    } else {
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
          if (res.status === 200) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((res) => {
          if (res === null) {
            alert("댓글 등록 실패!");
          } else {
            setReply((reply) => ({
              ...reply,
              content: "",
            }));
            setBoard((prevState) => ({
              ...prevState,
              replies: [...prevState.replies, res.data],
            }));
          }
        });
    }
  };

  return (
    <div>
      <br />
      <div>
        <Link
          to="/categoryPage"
          style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
          title="카테고리 별 게시글 페이지로 이동합니다."
        >
          Category: {board.subCategoryName}
        </Link>
        <br />
        <br />
        <div className={styles.contentTop}>
          <h1 style={{ margin: "0" }}>{board.title}</h1>
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
        <h6>{board.createDate}</h6>
        <hr />
      </div>
      <Card>
        <Card.Body>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: board.content }}
          />
        </Card.Body>
      </Card>
      <hr />
      <h2>댓글 달기</h2>
      <Form as={"div"}>
        <InputGroup className="mb-3">
          <Form.Control
            type="reply"
            onChange={changeValue}
            name="reply"
            placeholder="댓글을 입력하세요"
            value={reply.content || ""}
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
      </Form>
      <hr />
      <>
        {board.replies.map((reply) => {
          if (authority === "ROLE_TNUT") {
            return <AdminReplyItem key={reply.id} reply={reply} />;
          } else {
            return <ReplyItem key={reply.id} reply={reply} />;
          }
        })}
      </>
    </div>
  );
};

export default Content;
