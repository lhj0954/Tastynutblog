# Tastynut's blog
혼자서 만들고 운영해보는 개인 웹사이트입니다.

접속하기: [Tastynut-blog](http://www.tastynut.blog) (aws프리티어가 끝나서 종료) 

<hr/>
## 기술 스택
백엔드: SpringBoot, JPA, Oauth2.0(google, kakao, naver), SpringSecurity, Jwt

DB: MariaDB

프론트엔드: React.js

배포: AWS, Docker, DNS

## 구성도
<img width="80%" src="https://user-images.githubusercontent.com/74577825/202366723-49e93f96-a15e-4c80-b83c-8daed4616c7c.png">

## 동작 화면


## 개선해 나가야 할 점
 - 로그인하면 도메인 네임으로 리다이렉트 되지 않는다.
 - 유저 로그인 시 대분류를 선택하면 소분류 디폴트가 선택되지 않는다.
 - 로그인 시 home화면으로 간다. -> 제자리 로그인으로 변경한다.
 - 댓글, 카테고리 삭제 시에도 새로고침 안하고 바로 화면에 나타나도록 한다.
 - 뒤로가기나 앞으로 가기를 통해 카테고리 페이지에 도달했을 시 기존 선택했던 카테고리 유지하도록 한다.
## 새로 도입하고 싶은 기능
 - 반응형 웹 페이지로 리팩토링한다.
 - 모바일로 접속 시 모바일 최적화 화면을 만든다.  
[상세내용](https://bejewled-metatarsal-0e5.notion.site/c932b1257c5a41b98985bc873677f196)
