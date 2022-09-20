import React, { useEffect, useState } from "react";
import { Card, Carousel } from "react-bootstrap";
import IndexBoardItem from "../../components/index/IndexBoardItem";
import IndexBoardItemBlank from "../../components/index/IndexBoardItemBlank";
import styles from "../../css/Home.module.css";
import profile_img from "../../img/android-icon-144x144.png";

const Home = () => {
  // const [page, setPage] = useState(0);

  // const [disableFirst, setDisableFirst] = useState(false);
  // const [disableLast, setDisableLast] = useState(false);

  const [boards, setBoards] = useState([]);

  // const previousPage = () => {
  //   setPage(page - 1);
  // };

  // const nextPage = () => {
  //   setPage(page + 1);
  // };

  // const firstPage = () => {
  //   setPage(page - page);
  // };

  // const lastPage = () => {
  //   setPage(boards.totalPages - 1);
  // };

  // useEffect(() => {
  //   fetch("http://localhost:8080/?page=" + page) //localhost:8080에게 Get방식(기본값으로 표기안해도 됨)으로 요청을 보내면 controller가 받아서 로직실행
  //     .then((res) => res.json()) //받아온 데이터를 json으로 감싸서
  //     .then((res) => {
  //       //setBoards에게 깊은 복사-> 렌더링;
  //       setBoards(res);
  //       if (res.first) {
  //         setDisableFirst(true);
  //       } else {
  //         setDisableFirst(false);
  //       }
  //       if (res.last) {
  //         setDisableLast(true);
  //       } else {
  //         setDisableLast(false);
  //       }
  //     });
  // }, [page]); //page가 변할 때마다 한번씩
  //=> index페이지 변화 : 최근 글 15개만 받아오면 됨 해당 코드는 모든 게시글을 pageable로 받아오는 코드

  useEffect(() => {
    //인덱스 화면에 불러올 게시글 정보
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((res) => {
        setBoards(res);
      });
  }, []);

  //crausel index 설정
  let boards_1 = [];
  let boards_2 = [];
  let boards_3 = [];

  for (let index = 0; index < 5; index++) {
    boards_1.push(boards[index]);
  }
  for (let index = 5; index < 10; index++) {
    boards_2.push(boards[index]);
  }
  for (let index = 10; index < 15; index++) {
    boards_3.push(boards[index]);
  }

  return (
    <div>
      <br />
      <br />
      <div className={styles.profile}>
        <div style={{ textAlign: "center" }}>
          <div className={styles.profile_img_box}>
            <img
              alt="profile_img"
              src={profile_img}
              className={styles.profile_img}
            />
          </div>
          <div className={styles.one_line_introduction}>
            블로그 주인장 Tasty Nut 입니다.
          </div>
        </div>
        <Card className="text-center">
          <Card.Header>인삿말</Card.Header>
          <Card.Body>
            <Card.Title>[혼자서 만들고 운영해보는 블로그]</Card.Title>
            <Card.Text>
              안녕하세요. Tnut's blog의 주인장 Tasty Nut입니다.
            </Card.Text>
            <Card.Text>
              현재 이 블로그는 'react'와 'springBoot'으로 직접 만든 개인 기록용
              블로그 입니다.
              <br />
              제가 웹과 관련하여 공부한 내용을 직접 적용해 보고 혹은 일상을
              기록하는 공간입니다.
              <br />
              댓글은 자유롭게 작성하실 수 있으나 소셜 로그인을 한 후 작성해
              주세요.
              <br />
              블로그를 구성하는 코드는{" "}
              <a
                href="https://github.com/lhj0954/Tastynutblog.git"
                target="_blank"
                rel="noreferrer"
                title="Tnut's blog github"
              >
                깃허브
              </a>
              에서 볼 수 있습니다.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <hr />
        <h1 style={{ textAlign: "center" }}>최근 게시글</h1>
        <br />
        <Carousel
          variant="dark"
          style={{
            paddingBottom: "50px",
            paddingLeft: "130px",
            paddingRight: "100px",
          }}
        >
          <Carousel.Item interval={5000}>
            <div style={{ display: "flex", height: "400px" }}>
              {boards_1.map((board, index = 0) => {
                if (board) {
                  return <IndexBoardItem key={board.id} board={board} />;
                } else {
                  index++;
                  return <IndexBoardItemBlank key={index} />;
                }
              })}
            </div>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <div style={{ display: "flex", height: "400px" }}>
              {boards_2.map((board, index = 5) => {
                if (board) {
                  return <IndexBoardItem key={board.id} board={board} />;
                } else {
                  index++;
                  return <IndexBoardItemBlank key={index} />;
                }
              })}
            </div>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <div style={{ display: "flex", height: "400px" }}>
              {boards_3.map((board, index = 10) => {
                if (board) {
                  return <IndexBoardItem key={board.id} board={board} />;
                } else {
                  index++;
                  return <IndexBoardItemBlank key={index} />;
                }
              })}
            </div>
          </Carousel.Item>
        </Carousel>
        {/* <div style={{ display: "flex" }}>
          {boards.map((board) => {
            return <IndexBoardItem key={board.id} board={board} />;
          })}
        </div> */}
        <br />
      </div>
    </div>
  );
};

export default Home;
