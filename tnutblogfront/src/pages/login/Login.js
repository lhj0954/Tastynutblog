import { Button } from "react-bootstrap";
import React from "react";

const Login = () => {
  const handleLogin = (e) => {
    if (e.target.value === "google") {
      window.location.href = `http://localhost:8080/oauth2/authorization/google`;
    } else if (e.target.value === "naver") {
      window.location.href = `http://localhost:8080/oauth2/authorization/naver`;
    } else if (e.target.value === "kakao") {
      window.location.href = `http://localhost:8080/oauth2/authorization/kakao`;
    }
  };

  return (
    <div>
      <br />
      <p>
        <Button bg="secondary" value={"google"} onClick={handleLogin}>
          구글 로그인
        </Button>
      </p>
      <p>
        <Button bg="secondary" value={"naver"} onClick={handleLogin}>
          네이버 로그인
        </Button>
      </p>
      <p>
        <Button bg="secondary" value={"kakao"} onClick={handleLogin}>
          카카오 로그인
        </Button>
      </p>
    </div>
  );
};

export default Login;
