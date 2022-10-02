import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import styles from "../../css/SaveForm.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SaveForm = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    title: "",
    content: "",
    subCategory_id: "",
  });

  const [categories, setCategories] = useState([]); //카테고리 받아 올 곳
  const [subCategories, setSubCategories] = useState([]); //selection으로 부터 값을 받음

  const selectLC = (e) => {
    const categoryList = categories.filter(
      (category) => String(category.id) === e.target.value
    );
    setSubCategories(categoryList[0].subCategoryServiceDtoList);
  };

  useEffect(() => {
    fetch("http://blog_back:8080/category")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data); //공백에 가져온 정보로 채워줌
      });
  }, []);

  const changeValue = (e) => {
    setBoard((board) => ({
      ...board,
      [e.target.name]: e.target.value,
    }));
  };

  const changeContentValue = (e) => {
    setBoard((board) => ({
      ...board,
      content: e,
    }));
  };

  const submitBoard = (e) => {
    e.preventDefault();
    if (board.subCategory_id === "") {
      alert("카테고리를 선택하세요.");
    } else {
      fetch("http://blog_back:8080/admin/api/board/save", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(board),
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
            navigate("/categoryPage"); //글 등록 후 이전 페이지로
          } else {
            alert("글 등록 실패!");
          }
        });
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        { font: [] },
        "code-block",
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }, { background: [] }],
      [("link", "image")],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "background",
    "color",
    "indent",
    "link",
    "image",
    "width",
    "align",
    "font",
    "code-block",
  ];

  return (
    <Form as={"div"}>
      <Form.Group
        className="mb-3"
        controlId="formGroupTitle"
        style={{ marginTop: "20px" }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <Form.Select
              size="sm"
              onChange={selectLC}
              className={styles.category}
            >
              <option value={""}>=Select LargeCategory=</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.largeCategoryName}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Select
              size="sm"
              onChange={changeValue}
              name="subCategory_id"
              className={styles.category}
            >
              <option value={""}>=Select SubCategory=</option>
              {subCategories.map((subCategory) => {
                return (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.subCategoryName}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <Button
            variant="secondary"
            type="submit"
            onClick={submitBoard}
            style={{ marginLeft: "auto" }}
          >
            저장하기
          </Button>
        </div>
        <Form.Label className={styles.title}>Title</Form.Label>
        <Form.Control
          type="title"
          placeholder="Title..."
          onChange={changeValue}
          name="title"
        />
      </Form.Group>
      <br />
      <Form.Group className="mb-3" controlId="formGroupContent">
        <Form.Label>Content</Form.Label>
        <ReactQuill
          theme="snow"
          placeholder="내용을 입력해 주세요"
          onChange={changeContentValue}
          modules={modules}
          formats={formats}
          className={styles.quill}
        />
      </Form.Group>
    </Form>
  );
};

export default SaveForm;
