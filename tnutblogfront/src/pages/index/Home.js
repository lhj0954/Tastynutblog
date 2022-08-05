import React, { useEffect, useState } from "react";
import { Pagination, Card } from "react-bootstrap";
import BoardItem from "../../components/BoardItem";

const Home = () => {
  const [page, setPage] = useState(0);

  const [disable1, setDisable1] = useState(false);
  const [disable2, setDisable2] = useState(false);

  const [boards, setBoards] = useState({
    content: [],
  });

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const firstPage = () => {
    setPage(page - page);
  };

  const lastPage = () => {
    setPage(boards.totalPages - 1);
  };

  useEffect(() => {
    fetch("http://localhost:8080/?page=" + page) //localhost:8080에게 Get방식(기본값으로 표기안해도 됨)으로 요청을 보내면 controller가 받아서 로직실행
      .then((res) => res.json()) //받아온 데이터를 json으로 감싸서
      .then((res) => {
        //setBoards에게 깊은 참조-> 렌더링;
        setBoards(res);
        if (res.first) {
          setDisable1(true);
        } else {
          setDisable1(false);
        }
        if (res.last) {
          setDisable2(true);
        } else {
          setDisable2(false);
        }
      });
  }, [page]); //page가 변할 때마다 한번씩

  return (
    <div>
      <div>
        <Card className="bg-dark text-white">
          <Card.Img
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="Card image"
          />
          <Card.ImgOverlay>
            <Card.Title>안녕하세요! 이학준입니다!</Card.Title>
            <Card.Text>
              <li>자기 소개글</li>
              <li>사진은 내 얼굴 넣을 거임</li>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      </div>
      <div>
        <hr />
        <h1>새 게시글</h1>
        <br />
        <>
          {boards.content.map((board) => {
            return <BoardItem key={board.id} board={board} />;
          })}
        </>
        <br />
        <Pagination className="justify-content-md-center">
          <Pagination.Item disabled={disable1} onClick={firstPage}>
            첫 페이지
          </Pagination.Item>
          <Pagination.Prev disabled={disable1} onClick={previousPage} />
          <Pagination.Item active>{page + 1}</Pagination.Item>

          <Pagination.Next disabled={disable2} onClick={nextPage} />
          <Pagination.Item disabled={disable2} onClick={lastPage}>
            마지막 페이지
          </Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
};

export default Home;
