import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import BoardItem from "../BoardItem";
import styles from "../../css/UserSidebar.module.css";
import { host } from "../../variation.js";

const UserSideBar = (props) => {
  const largeCategories = props.largeCategories;
  const defaultLargeCategory = largeCategories[0];

  useEffect(() => {
    if (defaultLargeCategory) {
      getSubCategories(defaultLargeCategory.id);
    }
  }, [defaultLargeCategory]);

  const [key, setKey] = useState();

  const [subCategories, setSubCategories] = useState({
    largeCategoryId: "",
    subCategories: [],
  });

  const getSubCategories = (largeCategoryId) => {
    fetch("http://" + host + ":8080/side-bar/sub-categories/" + largeCategoryId)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        setSubCategories((subCategories) => ({
          ...subCategories,
          largeCategoryId: largeCategoryId,
          subCategories: res.data.subCategoryServiceDtoList,
        }));
      });
  };

  return (
    <div>
      <h1 className={styles.header}>Boards</h1>
      <div className={styles.sidebarGrid}>
        <div className={styles.largeCategory}>
          <ul className={styles.largeCategoryItems}>
            {largeCategories.map((largeCategory) => {
              return (
                <li
                  key={largeCategory.id}
                  onClick={() => {
                    getSubCategories(largeCategory.id);
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
            {subCategories.subCategories.map((subCategory) => {
              return (
                <Tab
                  key={subCategory.id}
                  title={subCategory.subCategoryName}
                  eventKey={subCategory.subCategoryName}
                >
                  {subCategory.boardListDto.boardServiceDtoList.map((board) => {
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
