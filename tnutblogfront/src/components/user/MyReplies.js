import React from "react";
import styles from "../../css/MyReplies.module.css";
import MyReplyItem from "./MyReplyItem";

const MyReplies = (props) => {
  //props로 부터 받은 댓글들로 Card작성
  const replies = props.replies;
  return (
    <div className={styles.layout}>
      {replies.map((reply) => {
        return <MyReplyItem key={reply.id} reply={reply} />;
      })}
    </div>
  );
};

export default MyReplies;
