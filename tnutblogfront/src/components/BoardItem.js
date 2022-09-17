import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BoardItem = (props) => {
  const { id, title } = props.board;

  return (
    <>
      <Card>
        <Card.Body style={{ display: "flex" }}>
          <Card.Title>{title}</Card.Title>
          <Link
            to={"/board/content/" + id}
            className="btn btn-outline-secondary"
            style={{ marginLeft: "auto" }}
          >
            상세보기
          </Link>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default BoardItem;
