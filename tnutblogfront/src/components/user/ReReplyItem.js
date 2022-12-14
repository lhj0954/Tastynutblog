import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Form, InputGroup } from "react-bootstrap";
import { host } from "../../variation.js";

const ReReplyItem = (props) => {
  const { id, nickname, createDate } = props.reReply;

  const [content, setContent] = useState(props.reReply.content);

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

  const updateReply = (e) => {
    e.preventDefault();
    if (contentValue.content.length === 0) {
      alert("빈 댓글을 작성하실 수 없습니다.");
    } else {
      fetch("http://" + host + ":8080/user/api/reply/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(contentValue),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((res) => {
          if (res !== null) {
            setContent(res.data);
            setMode("read");
          } else {
            alert("댓글 수정 실패!");
          }
        });
    }
  };

  const deleteReReply = (id) => {
    fetch("http://" + host + ":8080/user/api/reply/" + id, {
      method: "DELETE",
      headers: {
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          alert("삭제 되었습니다.");
          window.location.reload();
        } else {
          alert("삭제 실패");
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
                  {nickname}
                  {" / "}
                  {reReplyDate}{" "}
                  {nickname === accessor ? (
                    <>
                      <Button
                        variant="outline-secondary"
                        onClick={() => deleteReReply(id)}
                      >
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
