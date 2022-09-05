import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Form,
  InputGroup,
  useAccordionButton,
} from "react-bootstrap";
import AdminSubReplyItem from "./AdminSubReplyItem";

const AdminReplyItem = (props) => {
  const { content, id, subReplies, user, createDate } = props.comment;

  const [mode, setMode] = useState("read");

  const commentDate = createDate.substr(0, 10);

  const [accessor, setAccessor] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authority"))) {
      setAccessor(JSON.parse(localStorage.getItem("authority")).username);
    }
  }, [accessor]);

  const [contentValue, setContentValue] = useState({
    id: id,
    content: content,
  });

  const [subReply, setSubReply] = useState({
    parentReply_id: id,
    content: "",
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
            <span>{user.username} </span>
            <span style={{ float: "right" }}>
              {commentDate}{" "}
              {accessor === user.username ? (
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
              <InputGroup className="mb-3">
                <Form.Control
                  type="replyUpdate"
                  onChange={changeValue2}
                  name="replyUpdates"
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

            <>
              {subReplies.map((subreply) => {
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
