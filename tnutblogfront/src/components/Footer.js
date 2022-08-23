import React from "react";
import styles from "../css/Footer.module.css";
import github_img from "../img/free-icon-github-logo-25231.png";
import tstory_img from "../img/tstory-logo.png";

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
          alt="free-github-icon"
          src={tstory_img}
          style={{ height: "50px" }}
        />
      </a>
    </div>
  );
};

export default Footer;
