import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const ChangeNickname = (props) => {
  //username 바꾸는 fetch 함수 작성하고 닉네임 중복확인, spring security에 닉네임 바꾸는 요청 허용, state로 200아닐 시 아이디 중복 alert
  const originNickname = props.username;
  const [nickname, setNickname] = useState({
    changingNickname: originNickname,
  });

  const [isDuplicated, setIsDuplicated] = useState("y");

  const changeValue = (e) => {
    setNickname((username) => ({
      ...username,
      changingNickname: e.target.value,
    }));
    setIsDuplicated("y");
  };

  const checkUsername = (e) => {
    e.preventDefault();
    if (
      nickname.changingNickname.length === 0 ||
      nickname.changingNickname.length >= 10
    ) {
      alert("닉네임은 1~10글자 사이로 작성해 주세요");
    } else {
      fetch(
        "http://43.200.119.175:8080/new-nickname" + nickname.changingNickname
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.data === false) {
            setIsDuplicated("n");
            alert("사용가능한 username입니다.");
          } else {
            setIsDuplicated("y");
            alert("중복된 username입니다.");
          }
        });
    }
  };

  const changeUsername = (e) => {
    e.preventDefault();
    if (isDuplicated === "n") {
      fetch("http://43.200.119.175:8080/user/api/nickname", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          AccessToken: localStorage.getItem("Tnut's accessToken"),
        },
        body: JSON.stringify(nickname),
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
            if (res.data.provider === "google") {
              window.location.href = `http://ec2-43-200-119-175.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google`;
            } else if (res.data.provider === "naver") {
              window.location.href = `http://ec2-43-200-119-175.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver`;
            } else if (res.data.provider === "kakao") {
              window.location.href = `http://ec2-43-200-119-175.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao`;
            }
          } else {
            alert("username 수정 실패!");
          }
        });
    } else {
      alert("중복확인을 먼저 해 주세요");
    }
  };

  return (
    <div>
      <h4>닉네임 변경하기</h4>
      <hr />
      <InputGroup>
        <Form.Control
          type="nickname"
          name="changeNickname"
          placeholder="변경할 닉네임을 입력하세요."
          value={nickname.changingNickname || ""}
          onChange={changeValue}
        />
        <Button variant="outline-secondary" onClick={checkUsername}>
          중복확인
        </Button>
        <Button variant="outline-secondary" onClick={changeUsername}>
          변경하기
        </Button>
      </InputGroup>
    </div>
  );
};

export default ChangeNickname;
