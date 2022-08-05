import React, { useState } from "react";
import { Tab, Tabs, Nav } from "react-bootstrap";
import BoardItem from "./BoardItem";

const UserSideBar = (props) => {
  const [result, setResult] = useState({
    id: "",
    largeCategoryName: "",
    subCategories: [],
  });

  const [key, setKey] = useState("home");

  const setSubCategory = (e) => {
    setResult(e);
  };

  return (
    <div style={{ display: "ruby" }}>
      <Nav defaultActiveKey="/home" className="flex-column">
        {props.data.map((largeCategory) => {
          return (
            <Nav.Item
              key={largeCategory.id}
              onClick={() => {
                setSubCategory(largeCategory);
              }}
            >
              {largeCategory.largeCategoryName}
            </Nav.Item>
          );
        })}
      </Nav>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {result.subCategories.map((subCategory) => {
          //result={선택한 largeCategory의 id, largeCategoryName ,subCategories: id, subCategoryName, boards}
          return (
            <Tab
              eventKey={subCategory.subCategoryName}
              title={<span>{subCategory.subCategoryName}</span>}
              key={subCategory.id}
            >
              {subCategory.boards.map((board) => {
                return <BoardItem key={board.id} board={board} />;
              })}
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default UserSideBar;
