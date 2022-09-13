import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/LoginModal.module.css";
import google_login_img from "../img/btn_google_signin_light_normal_web.png";
import naver_login_img from "../img/btnW_perfect.png";
import kakao_login_img from "../img/kakao_login_medium_narrow.png";

const Header = () => {
  const navigate = useNavigate();
  const [authority, setAuthority] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authority")) {
      //authority라는 값이 있으면
      setAuthority(JSON.parse(localStorage.getItem("authority")).role);
      setUsername(JSON.parse(localStorage.getItem("authority")).username);
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
                      <Navbar.Collapse className="justify-content-end">
                        <NavDropdown
                          title={username}
                          id="collasible-nav-dropdown"
                          style={{ marginRight: "125px" }}
                        >
                          <NavDropdown.Item as="li">
                            <Link to="/managerPage" className="nav-link">
                              관리자 페이지
                            </Link>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Navbar.Collapse>
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
                      <NavDropdown
                        title={username}
                        id="collasible-nav-dropdown"
                        style={{ marginRight: "125px", marginLeft: "auto" }}
                      >
                        <NavDropdown.Item as="li">
                          <Link to="/mypage" className="nav-link">
                            My page
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link to="/categoryPage" className="nav-link">
                    카테고리 별 게시글
                  </Link>
                  <Nav.Item
                    className="nav-link"
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
          <div className={styles.info}>
            첫 로그인 시 임의로 닉네임이 설정됩니다.
          </div>
          <div className={styles.info}>로그인 후</div>
          <div className={styles.info}>
            우상단 닉네임을 클릭하여 Mypage에서 닉네임을 바꿔주세요.
          </div>
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
