import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreatePost from "./components/CreatePost/CreatePost";
import { Header } from "./components/Header";
import PostContent from "./components/PostContent/PostContent";
import CardDetail from "./components/CardDetail/CardDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <CreatePost />
        <Routes>
          <Route
            exact
            path="/"
            element={<PostContent />}
          />

          <Route
            path="/post/:id"
            element={<CardDetail />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
