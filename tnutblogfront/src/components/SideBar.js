import React, { useState } from "react";
import {
  Tab,
  Tabs,
  Button,
  Accordion,
  Form,
  Nav,
  CloseButton,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import BoardItem from "./BoardItem";

const SideBar = (props) => {
  const [result, setResult] = useState({
    id: "",
    largeCategoryName: "",
    subCategories: [],
  });

  const [key, setKey] = useState("home");

  const [largeCategory, setLargeCategory] = useState({
    largeCategoryName: "",
  });

  const [updateLC, setUpdateLC] = useState({
    largeCategoryName: "",
    id: "",
  });

  const changeValue = (e) => {
    setLargeCategory((largeCategory) => ({
      ...largeCategory,
      [e.target.name]: e.target.value,
    }));
  };

  const updateLargeCategoryV = (e) => {
    setUpdateLC((updateLC) => ({
      ...updateLC,
      largeCategoryName: e.target.value,
      id: e.target.id,
    }));
  };

  const setSubCategory = (e) => {
    setResult(e);
  };

  const deleteLargeCategory = (e) => {
    fetch(
      "http://localhost:8080/admin/api/largeCategory/" +
        e.target.value +
        "/delete",
      {
        method: "delete",
        headers: { AccessToken: localStorage.getItem("Tnut's accessToken") },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        if (res === "success delete") {
          window.location.reload();
        } else {
          alert("삭제 실패");
        }
      });
  };

  const updateLargeCategory = (e) => {
    e.preventDefault();
    console.log(updateLC);
    fetch(
      "http://localhost:8080/admin/api/largeCategory/" +
        updateLC.id +
        "/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(updateLC),
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
          alert("글 수정 실패!");
        }
      });
  };

  const submitLargeCategory = (e) => {
    e.preventDefault();
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
  };

  //--------------------------------------------------------------------------------------------------------
  const [subCategory, setsubCategory] = useState({
    //savesubCategory 초기화
    largeCategory_id: "", //
    subCategoryName: "", //target.value
  });

  const [updateSC, setUpdateSC] = useState({
    subCategoryName: "",
    id: "",
  });

  const updateSubCategoryV = (e) => {
    setUpdateSC((updateSC) => ({
      ...updateSC,
      subCategoryName: e.target.value,
      id: e.target.id,
    }));
  };

  const updateSubCategory = (e) => {
    e.preventDefault();
    console.log(updateSC);
    fetch(
      "http://localhost:8080/admin/api/subCategory/" + updateSC.id + "/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(updateSC),
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
          alert("글 수정 실패!");
        }
      });
  };

  const deleteSubCategory = (e) => {
    fetch(
      "http://localhost:8080/admin/api/subCategory/" +
        e.target.value +
        "/delete",
      {
        method: "delete",
        headers: {
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        if (res === "success delete") {
          window.location.reload();
        } else {
          alert("삭제 실패");
        }
      });
  };

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
  };

  //-------------------------------------------------------------------------------------------------------------------

  return (
    <div style={{ display: "ruby" }}>
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
        {props.data.map((largeCategory) => {
          return (
            <Nav.Item
              key={largeCategory.id}
              onClick={() => {
                setSubCategory(largeCategory);
              }}
            >
              {largeCategory.largeCategoryName}
              <CloseButton
                onClick={deleteLargeCategory}
                value={largeCategory.id}
              />
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>대분류 수정</Accordion.Header>
                  <Accordion.Body>
                    <Form onSubmit={updateLargeCategory}>
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Fix largeCategory"
                          aria-label="Fix largeCategory"
                          aria-describedby="basic-addon2"
                          id={largeCategory.id}
                          onChange={updateLargeCategoryV}
                        />
                        <Button
                          variant="outline-secondary"
                          id="button-addon2"
                          type="submit"
                        >
                          수정
                        </Button>
                      </InputGroup>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
              title={
                <span>
                  {subCategory.subCategoryName}
                  <CloseButton
                    onClick={deleteSubCategory}
                    value={subCategory.id}
                  />
                </span>
              }
              key={subCategory.id}
            >
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>소분류 수정</Accordion.Header>
                  <Accordion.Body>
                    <Form onSubmit={updateSubCategory}>
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Fix subCategory"
                          aria-label="Fix subCategory"
                          aria-describedby="basic-addon2"
                          id={subCategory.id}
                          onChange={updateSubCategoryV}
                        />
                        <Button
                          variant="outline-secondary"
                          id="button-addon2"
                          type="submit"
                        >
                          수정
                        </Button>
                      </InputGroup>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
  );
};

export default SideBar;
