import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../css/MyReplies.module.css";

const MyReplyItem = (props) => {
  const [reply, setReply] = useState({
    board: { id: "", title: "" },
    content: "",
    createDate: "",
    id: "",
  });

  useEffect(() => {
    setReply(props.reply);
  }, [props.reply]);

  return (
    <div>
      <div className={styles.reply}>
        <div className={styles.replyHead}>
          작성일: {reply.createDate}{" "}
          <span style={{ float: "right" }}>
            게시글 :{" "}
            <Link
              to={"/board/content/" + reply.board.id}
              style={{ color: "black" }}
            >
              {reply.board.title}
            </Link>
          </span>
        </div>
        <div className={styles.replyBody}>
          {reply.content ? (
            <Card>
              <Card.Body>{reply.content}</Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body style={{ color: "gray", fontStyle: "italic" }}>
                -삭제된 댓글입니다.-
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReplyItem;
