import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SaveForm = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    title: "",
    content: "",
    subCategory_id: "",
  });

  const [categories, setCategories] = useState([]); //카테고리 받아 올 곳 초기화
  const [largeCategoryId, setLargeCategoryId] = useState(""); //selection으로 부터 값을 받음

  const selectLC = (e) => {
    //largeCategory id값을 넘겨줌
    setLargeCategoryId(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8080/categoryNameList")
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

  const submitBoard = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/admin/api/board/save", {
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
  };

  return (
    <Form onSubmit={submitBoard}>
      <Form.Group className="mb-3" controlId="formGroupTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="title"
          placeholder="Title..."
          onChange={changeValue}
          name="title"
        />
      </Form.Group>
      <hr />
      <Form.Select size="sm" onChange={selectLC}>
        <option>Large Category</option>
        {categories
          .filter((category) => category.categoryType === "LARGE") //largeCategory 리스트가 출력됨
          .map((category) => {
            return (
              <option key={category.id} value={category.lcId}>
                {category.categoryName}
              </option>
            );
          })}
      </Form.Select>
      <Form.Select size="sm" onChange={changeValue} name="subCategory_id">
        <option>Sub Category</option>
        {categories
          .filter(
            (category) =>
              category.categoryType === "SUB" &&
              String(category.lcId) === largeCategoryId
          )
          .map((category) => {
            return (
              <option key={category.id} value={category.scId}>
                {category.categoryName}
              </option>
            );
          })}
      </Form.Select>
      <br />
      <Form.Group className="mb-3" controlId="formGroupContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="content"
          placeholder="Content..."
          onChange={changeValue}
          name="content"
        />
      </Form.Group>
      <hr />
      <br />
      <Button variant="outline-secondary" type="submit">
        저장하기
      </Button>
    </Form>
  );
};

export default SaveForm;
