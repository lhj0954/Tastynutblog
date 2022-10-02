import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch("http://blog_back:8080/admin/api/userList", {
      headers: {
        AccessToken: localStorage.getItem("Tnut's accessToken"),
      },
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
          setUserList(res.data);
        }
      });
  }, []);

  return (
    <div>
      <h4>회원관리</h4>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>id</th>
            <th>닉네임</th>
            <th>생성일</th>
            <th>작성한 댓글</th>
          </tr>
        </thead>
        <tbody>
          {userList
            .filter((user) => user.roleType === "ROLE_USER") //관리자 제외
            .map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nickname}</td>
                  <td>{user.createDate}</td>
                  <td>
                    <Link
                      to="/userReply"
                      style={{ color: "black" }}
                      state={user.replies}
                    >
                      댓글확인
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
