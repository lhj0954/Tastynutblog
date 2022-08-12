import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import SubReplyItem from "./SubReplyItem";

const ReplyItem = (props) => {
  const { content, id, subReplies, user } = props.comment;

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authority"))) {
      setUsername(JSON.parse(localStorage.getItem("authority")).username);
    }
  }, [username]);

  const [subReply, setSubReply] = useState({
    parentReply_id: id,
    content: "",
  });

  const [mode, setMode] = useState("read");

  const [contentValue, setContentValue] = useState({
    id: id,
    content: content,
  });

  const changeValue1 = (e) => {
    setSubReply((subReply) => ({
      ...subReply,
      content: e.target.value,
    }));
  };

  const changeValue2 = (e) => {
    setContentValue((contentValue) => ({
      ...contentValue,
      content: e.target.value,
    }));
  };

  const submitRereply = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/user/api/reReply/save", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
      body: JSON.stringify(subReply),
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
          window.location.reload();
        }
      });
  };

  const deleteReply = () => {
    fetch("http://localhost:8080/user/api/reply/" + id + "/delete", {
      method: "DELETE",
      headers: {
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "success delete!") {
          window.location.reload();
        } else {
          alert("삭제 실패");
        }
      });
  };

  const updateReply = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/user/api/reply/" + id + "/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
      body: JSON.stringify(contentValue),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json;
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          window.location.reload();
        } else {
          alert("댓글 수정 실패!");
        }
      });
  };

  return (
    <div>
      <Card>
        <Card.Header as="h5">
          작성자: {user.username}{" "}
          {user.username === username ? (
            <>
              <Button variant="outline-secondary" onClick={() => deleteReply()}>
                삭제
              </Button>{" "}
              <Button
                variant="outline-secondary"
                onClick={() => setMode("update")}
              >
                수정
              </Button>
            </>
          ) : (
            <></>
          )}
        </Card.Header>
        <Card.Body>
          {mode === "read" ? (
            <>
              {content !== null ? (
                <Card.Text>{content}</Card.Text>
              ) : (
                <Card.Text>"삭제된 댓글입니다."</Card.Text>
              )}
            </>
          ) : (
            <InputGroup className="mb-3">
              <Form.Control
                type="replyUpdate"
                onChange={changeValue2}
                name="replyUpdates"
                placeholder="글을 입력하세요"
                value={contentValue.content}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={updateReply}
              >
                수정하기
              </Button>
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={() => setMode("read")}
              >
                수정취소
              </Button>
            </InputGroup>
          )}
          <InputGroup className="mb-3">
            <Form.Control
              type="subReply"
              onChange={changeValue1}
              name="subReply"
              placeholder="글을 입력하세요"
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={submitRereply}
            >
              답변하기
            </Button>
          </InputGroup>
          <>
            {subReplies.map((subreply) => {
              return <SubReplyItem key={subreply.id} subreply={subreply} />;
            })}
          </>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default ReplyItem;
