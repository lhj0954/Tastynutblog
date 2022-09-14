import React from "react";
import styles from "../../css/Footer.module.css";
import github_img from "../../img/github.png";
import tstory_img from "../../img/tstory-logo.png";
import blogger_img from "../../img/free-icon-symbols-49334.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>Made by Tnut</div>
      <br />
      <a
        className={styles.relativesite_img}
        href="https://github.com/lhj0954"
        rel="noreferrer"
        target="_blank"
        title="move to Tnut's github"
      >
        <img
          alt="free-github-icon"
          src={github_img}
          style={{ height: "50px" }}
        />
      </a>
      <a
        className={styles.relativesite_img}
        href="https://tnut0305.tistory.com"
        rel="noreferrer"
        target="_blank"
        title="move to Tnut's Tstory"
      >
        <img
          alt="free-tstory-icon"
          src={tstory_img}
          style={{ height: "50px" }}
        />
      </a>
      <a
        className={styles.relativesite_img}
        href="https://tastynut0954.blogspot.com/"
        rel="noreferrer"
        target="_blank"
        title="move to Tnut's blogger"
      >
        <img
          alt="free-blogger-icon"
          src={blogger_img}
          style={{ height: "50px" }}
        />
      </a>
      <br />
      <br />
      <a
        href="https://www.flaticon.com/free-icons/github"
        title="github icons"
        style={{ textDecoration: "none", color: "black" }}
        target="_blank"
        rel="noreferrer"
      >
        Github icons created by Pixel perfect - Flaticon |
      </a>{" "}
      <a
        href="https://marshall-ku.tistory.com/134"
        title="티스토리 아이콘"
        style={{ textDecoration: "none", color: "black" }}
        target="_blank"
        rel="noreferrer"
      >
        티스토리 아이콘 다운 블로그 |
      </a>{" "}
      <a
        href="https://www.flaticon.com/kr/free-icons/"
        title="블로그 아이콘"
        style={{ textDecoration: "none", color: "black" }}
        target="_blank"
        rel="noreferrer"
      >
        블로그 아이콘 제작자: Freepik - Flaticon
      </a>
    </div>
  );
};

export default Footer;
