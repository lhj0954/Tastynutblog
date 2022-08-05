import React, { useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import AdminSubReplyItem from "./AdminSubReplyItem";

const AdminReplyItem = (props) => {
  const { content, id, subReplies, user } = props.comment;

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

  return (
    <div>
      <Card>
        <Card.Header as="h5">
          작성자: {user.username}{" "}
          {content !== null ? (
            <Button variant="outline-secondary" onClick={() => deleteReply()}>
              삭제
            </Button>
          ) : (
            <></>
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
        </Card.Header>
        <Card.Body>
          {content !== null ? (
            <Card.Text>{content}</Card.Text>
          ) : (
            <Card.Text>"삭제된 댓글입니다."</Card.Text>
          )}
          <>
            {subReplies.map((subreply) => {
              return (
                <AdminSubReplyItem key={subreply.id} subreply={subreply} />
              );
            })}
          </>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default AdminReplyItem;
