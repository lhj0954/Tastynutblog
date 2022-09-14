import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Form, InputGroup } from "react-bootstrap";

const ReReplyItem = (props) => {
  const { content, id, user, createDate } = props.reReply;

  const [accessor, setAccessor] = useState("");
  const reReplyDate = createDate.substr(0, 10);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authority"))) {
      setAccessor(JSON.parse(localStorage.getItem("authority")).nickname);
    }
  }, [accessor]);

  const [mode, setMode] = useState("read");

  const [contentValue, setContentValue] = useState({
    id: id,
    content: content,
  });

  const changeValue = (e) => {
    setContentValue((contentValue) => ({
      ...contentValue,
      content: e.target.value,
    }));
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
        console.log(res);
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
        {mode === "read" ? (
          <>
            {content !== null ? (
              <Card.Body>
                <span>↳ {content} </span>
                <div style={{ float: "right" }}>
                  {user.nickname}
                  {" / "}
                  {reReplyDate}{" "}
                  {user.nickname === accessor ? (
                    <>
                      <Button variant="outline-secondary" onClick={deleteReply}>
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
                </div>
              </Card.Body>
            ) : (
              <Card.Body>
                "삭제된 댓글입니다."
                {"   "}
              </Card.Body>
            )}
          </>
        ) : (
          <Form onSubmit={updateReply}>
            <InputGroup className="mb-3">
              <Form.Control
                type="replyUpdate"
                onChange={changeValue}
                name="replyUpdates"
                placeholder="글을 입력하세요"
                value={contentValue.content || ""}
              />
              <Badge
                bg="secondary"
                variant="outline-secondary"
                onClick={() => {
                  setMode("read");
                  setContentValue((contentValue) => ({
                    ...contentValue,
                    content: content,
                  }));
                }}
                style={{ padding: "10px", cursor: "pointer" }}
              >
                x
              </Badge>
            </InputGroup>
          </Form>
        )}
      </Card>
      <div style={{ height: "10px" }}></div>
    </div>
  );
};

export default ReReplyItem;
