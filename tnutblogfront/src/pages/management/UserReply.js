import React from "react";
import { Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const UserReply = () => {
  const location = useLocation();
  const replies = location.state;

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>id</th>
            <th>작성일</th>
            <th>내용</th>
            <th>해당 게시글</th>
          </tr>
        </thead>
        <tbody>
          {replies.map((reply) => {
            return (
              <tr key={reply.id}>
                <td>{reply.id}</td>
                <td>{reply.createDate}</td>
                <td>{reply.content}</td>
                <td style={{ width: "100px" }}>
                  <Link
                    to={"/board/content/" + reply.board.id}
                    style={{ color: "black" }}
                  >
                    게시글
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserReply;
