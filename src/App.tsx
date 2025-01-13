import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/Post";
import EditPost from "./pages/EditPost";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
