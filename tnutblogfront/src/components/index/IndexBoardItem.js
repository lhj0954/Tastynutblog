import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../css/IndexBoardItem.module.css";

const IndexBoardItem = (props) => {
  const { id, title, content, subCategoryName } = props.board;

  let subContent = content.replace(/<[^>]*>?/g, ""); //태그 지우기
  subContent = subContent.substr(0, 55);
  if (subContent.length >= 55) {
    subContent += "...";
  }

  let subTitle = title.substr(0, 10);
  if (subTitle.length >= 10) {
    subTitle += "...";
  }

  return (
    <>
      <Card border="secondary" style={{ width: "18rem", marginRight: "30px" }}>
        <Card.Header>{subCategoryName}</Card.Header>
        <Card.Body className={styles.cardBody}>
          <div className={styles.cardWrap}>
            <Card.Title>{subTitle}</Card.Title>
            <hr />
            <Card.Text className={styles.cardText}>{subContent}</Card.Text>
            <div>
              <Link
                to={"/board/content/" + id}
                className="btn btn-secondary"
                style={{ float: "right" }}
              >
                상세보기
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default IndexBoardItem;
