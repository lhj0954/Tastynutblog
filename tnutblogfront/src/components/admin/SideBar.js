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
  const defaultLargeCategory = props.data[0];
  const [key, setKey] = useState();

  const [largeCategory, setLargeCategory] = useState({
    largeCategoryName: "",
  });

  useEffect(() => {
    if (defaultLargeCategory) {
      setResult(defaultLargeCategory);
    }
  }, [defaultLargeCategory]);

  const changeValue = (e) => {
    setLargeCategory((largeCategory) => ({
      ...largeCategory,
      [e.target.name]: e.target.value,
    }));
  };

  const [result, setResult] = useState({
    id: "",
    largeCategoryName: "",
    subCategories: [],
  });

  const setSubCategory = (e) => {
    setResult(e);
    if (e.subCategories[0]) {
      setKey(e.subCategories[0].subCategoryName);
    }
  };

  const submitLargeCategory = (e) => {
    e.preventDefault();
    if (largeCategory.largeCategoryName.length === 0) {
      alert("빈칸 입력 불가");
    } else {
      fetch("http://localhost:8080/admin/api/largeCategory/save", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(largeCategory),
      })
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
            alert("대분류 카테고리 등록 실패!");
          }
        });
    }
  };

  const [subCategory, setsubCategory] = useState({
    //savesubCategory 초기화
    largeCategory_id: "", //
    subCategoryName: "", //target.value
  });

  const saveSubCategory = (e) => {
    //e.target.value, e.target.id
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
        "http://localhost:8080/admin/api/subCategory/" +
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
          console.log(res);
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
                        onChange={changeValue}
                        name="largeCategoryName"
                      />
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <br />
            {props.data.map((largeCategory) => {
              return (
                <div
                  key={largeCategory.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSubCategory(largeCategory);
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
            {result.subCategories.map((subCategory) => {
              //result={선택한 largeCategory의 id, largeCategoryName ,subCategories: id, subCategoryName, boards}
              return (
                <Tab
                  as="span"
                  key={subCategory.id}
                  title={<SideBarSubcategory subCategory={subCategory} />}
                  eventKey={subCategory.subCategoryName}
                >
                  {subCategory.boards.map((board) => {
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
                    id={result.id}
                    onChange={saveSubCategory}
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
