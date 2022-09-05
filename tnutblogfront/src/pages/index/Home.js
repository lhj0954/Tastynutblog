import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import IndexBoardItem from "../../components/IndexBoardItem";
import IndexBoardItemBlank from "../../components/IndexBoardItemBlank";
import styles from "../../css/Home.module.css";
import profile_img from "../../img/profile.jpg";

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
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((res) => {
        res.map((board) => {
          return delete board.replies;
        });
        setBoards(res);
      });
  }, []);

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
        <div style={{ borderRight: "1px gray solid", textAlign: "center" }}>
          <div className={styles.profile_img_box}>
            <img
              alt="profile_img"
              src={profile_img}
              className={styles.profile_img}
            />
          </div>
          <div className={styles.one_line_introduction}>
            일상 속의 여유를 찾아주는 개발자입니다!
          </div>
        </div>
        <div style={{ marginLeft: "30px" }}>블라블라</div>
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
              {boards_1.map((board) => {
                if (board) {
                  return <IndexBoardItem board={board} />;
                } else {
                  return <IndexBoardItemBlank />;
                }
              })}
            </div>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <div style={{ display: "flex", height: "400px" }}>
              {boards_2.map((board) => {
                if (board) {
                  return <IndexBoardItem board={board} />;
                } else {
                  return <IndexBoardItemBlank />;
                }
              })}
            </div>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <div style={{ display: "flex", height: "400px" }}>
              {boards_3.map((board) => {
                if (board) {
                  return <IndexBoardItem board={board} />;
                } else {
                  return <IndexBoardItemBlank />;
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
