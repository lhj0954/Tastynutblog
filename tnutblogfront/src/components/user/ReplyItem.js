import React, { useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  useAccordionButton,
} from "react-bootstrap";
import ReReplyItem from "./ReReplyItem";

const ReplyItem = (props) => {
  const { board_id, createDate, deletable, id, nickname } = props.reply;

  const [content, setContent] = useState(props.reply.content);

  const [reReplyServiceDtoList, setReReplyServiceDtoList] = useState(
    props.reply.reReplyServiceDtoList
  );

  let accessor;
  if (localStorage.getItem("authority")) {
    accessor = JSON.parse(localStorage.getItem("authority")).nickname;
  } else {
    accessor = "";
  }

  const replyDate = createDate.substr(0, 10);

  const [reReply, setReReply] = useState({
    parentReply_id: id,
    board_id: board_id,
    content: "",
    username: accessor,
  });

  const [mode, setMode] = useState("read");

  const [replyValue, setReplyValue] = useState({
    id: id,
    content: content,
  });

  const changeRereplyValue = (e) => {
    setReReply((reReply) => ({
      ...reReply,
      content: e.target.value,
    }));
  };

  const changeReplyValue = (e) => {
    setReplyValue((replyValue) => ({
      ...replyValue,
      content: e.target.value,
    }));
  };

  const updateReply = (e) => {
    e.preventDefault();
    if (replyValue.content.length === 0) {
      alert("빈 댓글은 작성하실 수 없습니다.");
    } else {
      fetch("http://43.200.119.175:8080/user/api/reply/" + id + "/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(replyValue),
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
    fetch("http://43.200.119.175:8080/user/api/reply/" + id + "/delete", {
      method: "DELETE",
      headers: {
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
          alert("삭제 되었습니다.");
        } else {
          alert("삭제 실패");
        }
      });
  };

  const submitRereply = (e) => {
    e.preventDefault();
    if (!accessor) {
      alert("로그인 후 댓글을 작성해 주세요");
    } else if (reReply.content.length === 0) {
      alert("빈 댓글은 작성하실 수 없습니다.");
    } else {
      fetch("http://43.200.119.175:8080/user/api/re-reply/save", {
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
            <div>
              <span> {nickname}</span>
              <span style={{ float: "right" }}>
                {replyDate}
                {"  "}
                {nickname === accessor ? (
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
                  <CustomToggle eventKey="0">답변하기</CustomToggle>
                )}
              </span>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form onSubmit={submitRereply}>
                {/*엔터에도 입력이 가능하도록*/}
                <InputGroup className="mb-3">
                  <Form.Control
                    type="reReply"
                    onChange={changeRereplyValue}
                    name="reReply"
                    value={reReply.content || ""}
                  />
                  {accessor ? (
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={submitRereply}
                    >
                      답변하기
                    </Button>
                  ) : (
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      disabled
                    >
                      로그인 해주세요
                    </Button>
                  )}
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
                    onChange={changeReplyValue}
                    name="replyUpdates"
                    value={replyValue.content || ""}
                  />
                  <Badge
                    bg="secondary"
                    variant="outline-secondary"
                    onClick={() => {
                      setMode("read");
                      setReplyValue((replyValue) => ({
                        ...replyValue,
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
                return <ReReplyItem key={reReply.id} reReply={reReply} />;
              })}
            </>
          </Card.Body>
        </Card>
      </Accordion>
      <br />
    </div>
  );
};

export default ReplyItem;
