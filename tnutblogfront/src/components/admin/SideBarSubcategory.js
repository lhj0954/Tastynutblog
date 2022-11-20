import React, { useState } from "react";
import { Badge, Form, FormControl, InputGroup } from "react-bootstrap";
import { host } from "../../variation.js";

const SideBarSubcategory = (props) => {
  const { id } = props.subCategory;

  const [subCategoryName, setSubCategoryName] = useState(
    props.subCategory.subCategoryName
  );

  const [mode, setMode] = useState("read");

  const [updateSC, setUpdateSC] = useState({
    subCategoryName: subCategoryName,
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
    fetch("http://" + host + ":8080/admin/api/sub-category/" + e.target.id, {
      method: "delete",
      headers: {
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
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

  const updateSubCategory = (e) => {
    e.preventDefault();
    if (updateSC.subCategoryName.length === 0) {
      alert("빈칸 입력 불가");
    } else {
      fetch("http://" + host + ":8080/admin/api/sub-category/" + updateSC.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(updateSC),
      })
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
            setSubCategoryName(res.data.subCategoryName);
          } else {
            alert("글 수정 실패!");
          }
        });
    }
  };

  return (
    <div>
      {mode === "read" ? (
        <>
          {subCategoryName}
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
          <Form onSubmit={updateSubCategory}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="소분류 입력"
                aria-label="Fix subCategory"
                aria-describedby="basic-addon2"
                id={id}
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
                    subCategoryName: subCategoryName,
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
