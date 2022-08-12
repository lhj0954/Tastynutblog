import React, { useState } from "react";
import { Tab, Tabs, Nav } from "react-bootstrap";
import BoardItem from "./BoardItem";
import styles from "../css/Sidebar.module.css";

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
    <div>
      <h1 className={styles.header}>Tnut's Boards</h1>
      <div className={styles.sidebarGrid}>
        <Nav defaultActiveKey="/home" className={styles.largeCategory}>
          <Nav.Item>
            {props.data.map((largeCategory) => {
              return (
                <Nav.Link
                  key={largeCategory.id}
                  onClick={() => {
                    setSubCategory(largeCategory);
                  }}
                  className={styles.largeCategoryItem}
                >
                  {largeCategory.largeCategoryName}
                </Nav.Link>
              );
            })}
          </Nav.Item>
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
                  return (
                    <>
                      <></>
                      <BoardItem key={board.id} board={board} />
                    </>
                  );
                })}
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default UserSideBar;
