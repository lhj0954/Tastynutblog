import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/index/Home";
import SaveForm from "./pages/board/SaveForm";
import Content from "./pages/board/Content";
import UpdateForm from "./pages/board/UpdateForm";
import Category from "./pages/category/Category";
import { Helmet } from "react-helmet";
import Redirect from "./pages/Redirect";

function App() {
  return (
    <div>
      <Helmet>
        <title>Tnut's Blog</title>
      </Helmet>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board/saveForm" element={<SaveForm />} />
          <Route path="/board/content/:id" element={<Content />} />
          <Route path="/board/updateForm/:id" element={<UpdateForm />} />
          <Route path="/categoryPage" element={<Category />} />
          <Route path="/oauth/redirect" element={<Redirect />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
