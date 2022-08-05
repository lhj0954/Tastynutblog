import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          Tnut
        </Link>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {authority ? (
              <>
                {authority === "ROLE_TNUT" ? (
                  <>
                    <Link to="/board/saveForm" className="nav-link">
                      글쓰기
                    </Link>
                    <Link to="/categoryPage" className="nav-link">
                      카테고리 별 게시글
                    </Link>
                    <Nav.Item onClick={handleLogout} className="nav-link">
                      Logout
                    </Nav.Item>
                  </>
                ) : (
                  <>
                    <Link to="/categoryPage" className="nav-link">
                      카테고리 별 게시글
                    </Link>
                    <Nav.Item onClick={handleLogout} className="nav-link">
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
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
