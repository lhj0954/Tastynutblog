import React, { useState } from "react";
import { Badge, Form, FormControl, InputGroup } from "react-bootstrap";

const SideBarSubcategory = (props) => {
  const subCategory = props.subCategory;

  const [mode, setMode] = useState("read");

  const [updateSC, setUpdateSC] = useState({
    subCategoryName: subCategory.subCategoryName,
    id: "",
  });

  const updateSubCategoryV = (e) => {
    setUpdateSC((updateSC) => ({
      ...updateSC,
      subCategoryName: e.target.value,
      id: e.target.id,
    }));
  };

  const deleteSubCategory = (e) => {
    fetch(
      "http://localhost:8080/admin/api/subCategory/" + e.target.id + "/delete",
      {
        method: "delete",
        headers: {
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        if (res === "success delete") {
          window.location.reload();
        } else {
          alert("삭제 실패");
        }
      });
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

  return (
    <div>
      {mode === "read" ? (
        <>
          {subCategory.subCategoryName}
          {"     "}
          <div
            style={{
              float: "right",
              paddingLeft: "7px",
            }}
          >
            <Badge
              bg="danger"
              style={{ cursor: "pointer", marginRight: "4px" }}
              onClick={deleteSubCategory}
              id={subCategory.id}
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
          <Form onSubmit={updateSubCategory}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="소분류 입력"
                aria-label="Fix subCategory"
                aria-describedby="basic-addon2"
                id={subCategory.id}
                onChange={updateSubCategoryV}
                value={updateSC.subCategoryName || ""}
              />
              <Badge
                bg="secondary"
                variant="outline-secondary"
                onClick={() => {
                  setMode("read");
                  setUpdateSC((updateSC) => ({
                    ...updateSC,
                    subCategoryName: subCategory.subCategoryName,
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
    </div>
  );
};

export default SideBarSubcategory;
