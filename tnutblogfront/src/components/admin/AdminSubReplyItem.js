import React, { useState } from "react";
import { Badge, Button, Card, Form, InputGroup } from "react-bootstrap";

const AdminSubReplyItem = (props) => {
  const { content, id, nickname, createDate } = props.reReply[0];

  const [_content, set_Content] = useState(content);

  const accessor = props.reReply[1];

  const [mode, setMode] = useState("read");

  const reReplyDateDate = createDate.substr(0, 10);

  const [contentValue, setContentValue] = useState({
    id: id,
    content: _content,
  });

  const changeValue = (e) => {
    setContentValue((contentValue) => ({
      ...contentValue,
      content: e.target.value,
    }));
  };

  const deleteReply = () => {
    fetch("http://localhost:8080/admin/api/reply/" + id + "/delete", {
      method: "DELETE",
      headers: {
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else {
          alert("삭제 실패");
        }
      });
  };

  const updateReply = (e) => {
    e.preventDefault();
    if (contentValue.content.length === 0) {
      alert("빈 댓글은 작성하실 수 없습니다.");
    } else {
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
            return res.json();
          } else {
            return null;
          }
        })
        .then((res) => {
          if (res !== null) {
            set_Content(res.data);
            setMode("read");
          } else {
            alert("댓글 수정 실패!");
          }
        });
    }
  };

  return (
    <div>
      <Card>
        {mode === "read" ? (
          <>
            {_content !== null ? (
              <Card.Body>
                <span>↳ {_content}</span>
                <span style={{ float: "right" }}>
                  {nickname}
                  {" / "}
                  {reReplyDateDate}{" "}
                  {accessor === nickname ? (
                    <>
                      {}
                      <Button
                        variant="outline-secondary"
                        onClick={() => deleteReply()}
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
                    <Button
                      variant="outline-secondary"
                      onClick={() => deleteReply()}
                    >
                      삭제
                    </Button>
                  )}
                </span>
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
                    content: _content,
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
    </div>
  );
};

export default AdminSubReplyItem;
