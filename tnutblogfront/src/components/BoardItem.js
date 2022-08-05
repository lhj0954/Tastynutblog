import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BoardItem = (props) => {
  //Home.js에게 받은 데이터를 바탕으로
  const { id, title } = props.board;

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Link to={"/board/content/" + id} className="btn btn-secondary">
            상세보기
          </Link>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default BoardItem;
