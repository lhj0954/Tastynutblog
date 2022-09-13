import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/index/Home";
import SaveForm from "./pages/board/SaveForm";
import Content from "./pages/board/Content";
import UpdateForm from "./pages/board/UpdateForm";
import Category from "./pages/category/Category";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Redirect from "./pages/Redirect";
import Footer from "./components/Footer";
import styles from "./css/Display.module.css";
import Mypage from "./pages/Mypage";
import ManagerPage from "./pages/management/ManagerPage";
import UserReply from "./pages/management/UserReply";

function App() {
  return (
    <div className={styles.body}>
      <HelmetProvider>
        <Helmet>
          <title>Tnut's Blog</title>
        </Helmet>
      </HelmetProvider>
      <div className={styles.wrapper}>
        <Header />
        <Container className={styles.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board/saveForm" element={<SaveForm />} />
            <Route path="/board/content/:id" element={<Content />} />
            <Route path="/board/updateForm/:id" element={<UpdateForm />} />
            <Route path="/categoryPage" element={<Category />} />
            <Route path="/oauth/redirect" element={<Redirect />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/managerPage" element={<ManagerPage />} />
            <Route path="/userReply" element={<UserReply />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default App;
