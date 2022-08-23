import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/LoginModal.module.css";
import google_login_img from "../img/btn_google_signin_light_normal_web.png";
import naver_login_img from "../img/btnW_perfect.png";
import kakao_login_img from "../img/kakao_login_medium_narrow.png";

const Header = () => {
  const navigate = useNavigate();
  const [authority, setAuthority] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authority")) {
      //authority라는 값이 있으면
      setAuthority(JSON.parse(localStorage.getItem("authority")).role);
    }
  }, [authority]);

  const handleLogout = () => {
    //localstorage 삭제
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleLogin = (loginType) => {
    if (loginType === "google") {
      window.location.href = `http://localhost:8080/oauth2/authorization/google`;
    } else if (loginType === "naver") {
      window.location.href = `http://localhost:8080/oauth2/authorization/naver`;
    } else if (loginType === "kakao") {
      window.location.href = `http://localhost:8080/oauth2/authorization/kakao`;
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link
            to="/"
            className="navbar-brand"
            style={{ marginLeft: "40px", fontSize: "40px" }}
          >
            Tnut's blog
          </Link>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="flex-grow-1 pe-3"
              style={{ maxHeight: "100px", fontSize: "20px" }}
            >
              {authority ? (
                <>
                  {authority === "ROLE_TNUT" ? (
                    <>
                      <Link to="/board/saveForm" className="nav-link">
                        글쓰기
                      </Link>
                      <Link to="/categoryPage" className="nav-link">
                        글 관리 페이지
                      </Link>
                      <Nav.Item
                        onClick={handleLogout}
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                      >
                        Logout
                      </Nav.Item>
                    </>
                  ) : (
                    <>
                      <Link to="/categoryPage" className="nav-link">
                        카테고리 별 게시글
                      </Link>
                      <Nav.Item
                        onClick={handleLogout}
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                      >
                        Logout
                      </Nav.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link to="/categoryPage" className="nav-link">
                    카테고리 별 게시글
                  </Link>
                  <Nav.Item
                    class="nav-link"
                    onClick={handleShow}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>로그인을 해주세요</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={styles.loginButton}>
            <img
              className={styles.loginImg}
              alt="goole-login-img"
              src={google_login_img}
              onClick={() => handleLogin("google")}
            />
          </p>
          <p className={styles.loginButton}>
            <img
              className={styles.loginImg}
              alt="kakao-login-img"
              src={kakao_login_img}
              onClick={() => handleLogin("kakao")}
            />
          </p>
          <p className={styles.loginButton}>
            <img
              className={styles.loginImg}
              alt="naver-login-img"
              src={naver_login_img}
              onClick={() => handleLogin("naver")}
            />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
