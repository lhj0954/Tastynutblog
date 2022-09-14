import React from "react";
import styles from "../../css/Mycomments.module.css";
import CommentItem from "./CommentItem";

const Mycomments = (props) => {
  //props로 부터 받은 댓글들로 Card작성
  const comments = props.comments;
  return (
    <div className={styles.layout}>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export default Mycomments;
