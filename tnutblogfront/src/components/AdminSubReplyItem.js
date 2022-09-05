import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

const AdminSubReplyItem = (props) => {
  const { content, id, user } = props.subreply[0];
  const accessor = props.subreply[1];

  const [mode, setMode] = useState("read");

  const deleteReply = () => {
    fetch("http://localhost:8080/admin/api/reply/" + id + "/delete", {
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

  return (
    <div>
      <Card>
        {content !== null ? (
          <Card.Body>
            {content} 작성자: {user.username}
            {"   "}
            {accessor === user.username ? (
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
              <Button variant="outline-secondary" onClick={() => deleteReply()}>
                삭제
              </Button>
            )}
          </Card.Body>
        ) : (
          <Card.Body>
            "삭제된 댓글입니다."
            {"   "}
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default AdminSubReplyItem;
