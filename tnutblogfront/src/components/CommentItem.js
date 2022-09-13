import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../css/Mycomments.module.css";

const CommentItem = (props) => {
  const [comment, setComment] = useState({
    board: { id: "", title: "" },
    content: "",
    createDate: "",
    id: "",
  });

  useEffect(() => {
    setComment(props.comment);
  }, [props.comment]);

  return (
    <div>
      <div className={styles.comment}>
        <div className={styles.commentHead}>
          작성일: {comment.createDate}{" "}
          <span style={{ float: "right" }}>
            게시글 :{" "}
            <Link
              to={"/board/content/" + comment.board.id}
              className="btn btn-secondary"
            >
              {comment.board.title}
            </Link>
          </span>
        </div>
        <div className={styles.commentBody}>
          <Card>
            <Card.Body>{comment.content}</Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
