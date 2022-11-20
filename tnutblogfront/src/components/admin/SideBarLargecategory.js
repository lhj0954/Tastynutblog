import React, { useState } from "react";
import { Badge, Form, FormControl, InputGroup, Nav } from "react-bootstrap";
import styles from "../../css/SideBarLargeCategory.module.css";
import { host } from "../../variation.js";

const SideBarLargecategory = (props) => {
  const { id } = props.largeCategory;

  const [largeCategoryName, setLargeCategoryName] = useState(
    props.largeCategory.largeCategoryName
  );

  const [mode, setMode] = useState("read");

  const [updateLC, setUpdateLC] = useState({
    largeCategoryName: largeCategoryName,
    id: "",
  });

  const deleteLargeCategory = (e) => {
    e.preventDefault();
    fetch("http://" + host + ":8080/admin/api/large-category/" + e.target.id, {
      method: "delete",
      headers: { AccessToken: localStorage.getItem("Tnut's accessToken") },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else {
          alert("삭제 실패");
        }
      });
  };

  const changeValue_updateLarge = (e) => {
    setUpdateLC((updateLC) => ({
      ...updateLC,
      largeCategoryName: e.target.value,
      id: e.target.id,
    }));
  };

  const updateLargeCategory = (e) => {
    e.preventDefault();
    if (updateLC.largeCategoryName.length === 0) {
      alert("빈칸 입력 불가");
    } else {
      fetch(
        "http://" + host + ":8080/admin/api/large-category/" + updateLC.id,
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
          if (res.status === 200) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((res) => {
          if (res !== null) {
            setMode("read");
            setLargeCategoryName(res.data.largeCategoryName);
          } else {
            alert("글 수정 실패!");
          }
        });
    }
  };

  return (
    <div>
      <Nav.Item className={styles.largeCategoryItem}>
        {mode === "read" ? (
          <>
            <h3 style={{ display: "inline" }}>{largeCategoryName}</h3>
            <div
              style={{ float: "right", paddingTop: "6px", paddingRight: "4px" }}
            >
              <Badge
                bg="danger"
                style={{ cursor: "pointer", marginRight: "4px" }}
                onClick={deleteLargeCategory}
                id={id}
              >
                삭제
              </Badge>
              <Badge
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
                  placeholder="대분류 입력"
                  aria-label="Fix largeCategory"
                  aria-describedby="basic-addon2"
                  id={id}
                  onChange={changeValue_updateLarge}
                  value={updateLC.largeCategoryName || ""}
                />
                <Badge
                  bg="secondary"
                  variant="outline-secondary"
                  onClick={() => {
                    setMode("read");
                    setUpdateLC((updateLC) => ({
                      ...updateLC,
                      largeCategoryName: largeCategoryName,
                    }));
                  }}
                  style={{ padding: "10px" }}
                >
                  x
                </Badge>
              </InputGroup>
            </Form>
          </>
        )}
      </Nav.Item>
    </div>
  );
};

export default SideBarLargecategory;
