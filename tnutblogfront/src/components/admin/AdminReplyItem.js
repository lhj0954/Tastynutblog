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
import { host } from "../../variation.js";

const AdminReplyItem = (props) => {
  const { board_id, createDate, deletable, id, nickname } = props.reply;

  const [content, setContent] = useState(props.reply.content);

  const [reReplyServiceDtoList, setReReplyServiceDtoList] = useState(
    props.reply.reReplyServiceDtoList
  );

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

  const [reReply, setReReply] = useState({
    parentReply_id: id,
    board_id: board_id,
    content: "",
    username: JSON.parse(localStorage.getItem("authority")).nickname, //관리자는 무조건 로그인 상태이므로 null고려 x
  });

  const reReplyValue = (e) => {
    setReReply((reReply) => ({
      ...reReply,
      content: e.target.value,
    }));
  };

  const rePlyUpdateValue = (e) => {
    setContentValue((contentValue) => ({
      ...contentValue,
      content: e.target.value,
    }));
  };

  const submitRereply = (e) => {
    e.preventDefault();
    if (reReply.content.length === 0) {
      alert("빈 댓글은 작성하실 수 없습니다.");
    } else {
      fetch("http://" + host + ":8080/user/api/re-reply", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(reReply),
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
            setReReply((reReply) => ({
              ...reReply,
              content: "",
            }));
            setReReplyServiceDtoList([...reReplyServiceDtoList, res.data]);
          }
        });
    }
  };

  const updateReply = (e) => {
    e.preventDefault();
    if (contentValue.content.length === 0) {
      alert("빈 댓글은 작성하실 수 없습니다.");
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

  const deleteReply = () => {
    fetch("http://" + host + ":8080/admin/api/reply/" + id, {
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
            <span>{nickname} </span>
            <span style={{ float: "right" }}>
              {replyDate}{" "}
              {accessor === nickname ? (
                <>
                  {deletable === true ? (
                    <></>
                  ) : (
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
                    </>
                  )}

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
              <Form onSubmit={submitRereply}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="reReply"
                    onChange={reReplyValue}
                    value={reReply.content || ""}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={submitRereply}
                  >
                    답변하기
                  </Button>
                </InputGroup>
              </Form>
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
                    onChange={rePlyUpdateValue}
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
              {reReplyServiceDtoList.map((reReply) => {
                return (
                  <AdminSubReplyItem
                    key={reReply.id}
                    reReply={[reReply, accessor]}
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
