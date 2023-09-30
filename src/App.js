import "./App.css";
import CreatePost from "./components/CreatePost/CreatePost";
import { Header } from "./components/Header";
import PostContent from "./components/PostContent/PostContent";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <CreatePost />
        <PostContent />
      </div>
    </div>
  );
}

export default App;
