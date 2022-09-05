import React, { useState } from "react";
import {
  Badge,
  Button,
  Form,
  FormControl,
  InputGroup,
  Nav,
} from "react-bootstrap";
import styles from "../css/SideBarLargeCategory.module.css";

const SideBarLargecategory = (props) => {
  const largeCategory = props.largeCategory;
  const [mode, setMode] = useState("read");

  const [updateLC, setUpdateLC] = useState({
    largeCategoryName: "",
    id: "",
  });

  const deleteLargeCategory = (e) => {
    console.log(e);
    fetch(
      "http://localhost:8080/admin/api/largeCategory/" +
        e.target.id +
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

  const updateLargeCategoryV = (e) => {
    setUpdateLC((updateLC) => ({
      ...updateLC,
      largeCategoryName: e.target.value,
      id: e.target.id,
    }));
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

  return (
    <div>
      <Nav.Item className={styles.largeCategoryItem}>
        {mode === "read" ? (
          <>
            <h3 style={{ display: "inline" }}>
              {largeCategory.largeCategoryName}
            </h3>
            <div
              style={{ float: "right", paddingTop: "6px", paddingRight: "4px" }}
            >
              <Badge
                pill
                bg="danger"
                style={{ cursor: "pointer", marginRight: "4px" }}
                onClick={deleteLargeCategory}
                id={largeCategory.id}
              >
                삭제
              </Badge>
              <Badge
                pill
                bg="warning"
                text="dark"
                onClick={() => {
                  setMode("update");
                }}
                style={{ cursor: "pointer" }}
              >
                수정
              </Badge>
            </div>
          </>
        ) : (
          <>
            <Form onSubmit={updateLargeCategory}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Category Rename"
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
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={() => setMode("read")}
                >
                  수정취소
                </Button>
              </InputGroup>
            </Form>
          </>
        )}
      </Nav.Item>
    </div>
  );
};

export default SideBarLargecategory;
