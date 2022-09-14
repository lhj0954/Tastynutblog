import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  useAccordionButton,
} from "react-bootstrap";
import AdminSubReplyItem from "./AdminSubReplyItem";

const AdminReplyItem = (props) => {
  const { content, id, reReplies, user, createDate, board } = props.reply;

  const [mode, setMode] = useState("read");

  const replyDate = createDate.substr(0, 10);

  const [accessor, setAccessor] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authority"))) {
      setAccessor(JSON.parse(localStorage.getItem("authority")).nickname);
    }
  }, [accessor]);

  const [contentValue, setContentValue] = useState({
    id: id,
    content: content,
  });

  const [subReply, setSubReply] = useState({
    parentReply_id: id,
    board_id: board.id,
    content: "",
    username: JSON.parse(localStorage.getItem("authority")).username, //관리자는 무조건 로그인 상태이므로 null고려 x
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
    fetch("http://localhost:8080/admin/api/reply/" + id + "/delete", {
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

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <>
        <Button
          type="button"
          onClick={decoratedOnClick}
          variant="outline-secondary"
        >
          {children}
        </Button>
      </>
    );
  }

  return (
    <div>
      <Accordion>
        <Card>
          <Card.Header as="h5">
            <span>{user.nickname} </span>
            <span style={{ float: "right" }}>
              {replyDate}{" "}
              {accessor === user.nickname ? (
                <>
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
                  </Button>{" "}
                  <CustomToggle eventKey="0">답변하기</CustomToggle>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-secondary"
                    onClick={() => deleteReply()}
                  >
                    삭제
                  </Button>{" "}
                  <CustomToggle eventKey="0">답변하기</CustomToggle>
                </>
              )}
            </span>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <InputGroup className="mb-3">
                <Form.Control
                  type="subReply"
                  onChange={changeValue1}
                  name="subReply"
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={submitRereply}
                >
                  답변하기
                </Button>
              </InputGroup>
            </Card.Body>
          </Accordion.Collapse>
          <hr style={{ margin: 0 }} />
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
              <Form onSubmit={updateReply}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="replyUpdate"
                    onChange={changeValue2}
                    name="replyUpdates"
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

            <>
              {reReplies.map((subreply) => {
                return (
                  <AdminSubReplyItem
                    key={subreply.id}
                    subreply={[subreply, accessor]}
                  />
                );
              })}
            </>
          </Card.Body>
        </Card>
      </Accordion>
      <br />
    </div>
  );
};

export default AdminReplyItem;
