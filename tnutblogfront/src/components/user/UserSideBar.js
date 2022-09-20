import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import BoardItem from "../BoardItem";
import styles from "../../css/UserSidebar.module.css";

const UserSideBar = (props) => {
  const defaultLargeCategory = props.largeCategory[0];

  const [result, setResult] = useState({
    id: "",
    largeCategoryName: "",
    subCategories: [],
  });

  useEffect(() => {
    if (defaultLargeCategory) {
      setResult(defaultLargeCategory);
    }
  }, [defaultLargeCategory]);

  const [key, setKey] = useState();

  const setSubCategory = (e) => {
    setResult(e);
    if (e.subCategories[0]) {
      setKey(e.subCategories[0].subCategoryName);
    }
  };

  return (
    <div>
      <h1 className={styles.header}>Boards</h1>
      <div className={styles.sidebarGrid}>
        <div className={styles.largeCategory}>
          <ul className={styles.largeCategoryItems}>
            {props.largeCategory.map((largeCategory) => {
              return (
                <li
                  key={largeCategory.id}
                  onClick={() => {
                    setSubCategory(largeCategory);
                  }}
                  className={styles.largeCategoryItem}
                >
                  <h3>{largeCategory.largeCategoryName}</h3>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.tabs}>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            {result.subCategories.map((subCategory) => {
              return (
                <Tab
                  key={subCategory.id}
                  title={subCategory.subCategoryName}
                  eventKey={subCategory.subCategoryName}
                >
                  {subCategory.boards.map((board) => {
                    return <BoardItem key={board.id} board={board} />;
                  })}
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
