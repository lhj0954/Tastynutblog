import React, { useEffect, useState } from "react";
import {
  Tab,
  Tabs,
  Button,
  Accordion,
  Form,
  Nav,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import styles from "../../css/Sidebar.module.css";
import BoardItem from "../BoardItem";
import SideBarLargecategory from "./SideBarLargecategory";
import SideBarSubcategory from "./SideBarSubcategory";

const SideBar = (props) => {
  const { largeCategories } = props;

  const defaultLargeCategory = largeCategories[0];
  const [key, setKey] = useState();

  const [largeCategory, setLargeCategory] = useState({
    largeCategoryName: "",
  });

  useEffect(() => {
    if (defaultLargeCategory) {
      getSubCategories(defaultLargeCategory.id);
    }
  }, [defaultLargeCategory]);

  const changeValue_large = (e) => {
    setLargeCategory((largeCategory) => ({
      ...largeCategory,
      [e.target.name]: e.target.value,
    }));
  };

  const [subCategories, setSubCategories] = useState({
    largeCategory_id: "",
    subCategories: [],
  });

  const getSubCategories = (id) => {
    fetch("http://43.200.119.175:8080/sideBar/" + id + "/subCategories")
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
          largeCategory_id: id,
          subCategories: res.data,
        }));
      });
  };

  const submitLargeCategory = (e) => {
    e.preventDefault();
    if (largeCategory.largeCategoryName.length === 0) {
      alert("빈칸 입력 불가");
    } else {
      fetch("http://43.200.119.175:8080/admin/api/large-category/save", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(largeCategory),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((res) => {
          console.log(res);
          if (res !== null) {
            window.location.reload();
          } else {
            alert("대분류 카테고리 등록 실패!");
          }
        });
    }
  };

  const [subCategory, setsubCategory] = useState({
    //savesubCategory 초기화
    largeCategory_id: "",
    subCategoryName: "",
  });

  const changeValue_sub = (e) => {
    setsubCategory((subCategory) => ({
      ...subCategory,
      largeCategory_id: e.target.id,
      subCategoryName: e.target.value,
    }));
  };

  const submitSubCategory = (e) => {
    e.preventDefault();
    if (subCategory.subCategoryName.length === 0) {
      alert("빈칸 입력 불가");
    } else {
      fetch(
        "http://43.200.119.175:8080/admin/api/sub-category/" +
          subCategory.largeCategory_id +
          "/save",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            AccessToken: localStorage.getItem("Tnut's accessToken"),
          },
          body: JSON.stringify(subCategory),
        }
      )
        .then((res) => {
          if (res.status === 200) {
            return res.json;
          } else {
            return null;
          }
        })
        .then((res) => {
          if (res !== null) {
            window.location.reload();
          } else {
            alert("소분류 카테고리 등록 실패!");
          }
        });
    }
  };

  return (
    <div>
      <br />
      <h1 style={{ borderBottom: "solid 1px gray", marginBottom: 0 }}>
        Boards
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
        }}
      >
        <div className={styles.largeCategory}>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>대분류 추가!</Accordion.Header>
                <Accordion.Body>
                  <Form onSubmit={submitLargeCategory}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="add Category"
                        onChange={changeValue_large}
                        name="largeCategoryName"
                      />
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <br />
            {largeCategories.map((largeCategory) => {
              return (
                <div
                  key={largeCategory.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    getSubCategories(largeCategory.id);
                  }}
                >
                  <SideBarLargecategory largeCategory={largeCategory} />
                </div>
              );
            })}
          </Nav>
        </div>
        <div className={styles.subCategory}>
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
                  title={<SideBarSubcategory subCategory={subCategory} />}
                  eventKey={subCategory.subCategoryName}
                >
                  {subCategory.boardServiceDtoList.map((board) => {
                    return <BoardItem key={board.id} board={board} />;
                  })}
                </Tab>
              );
            })}
            <Tab eventKey="add" title="add">
              <Form onSubmit={submitSubCategory}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Create subCategory"
                    aria-label="Create subCategory"
                    aria-describedby="basic-addon2"
                    id={subCategories.largeCategory_id}
                    onChange={changeValue_sub}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    type="submit"
                  >
                    등록
                  </Button>
                </InputGroup>
              </Form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
