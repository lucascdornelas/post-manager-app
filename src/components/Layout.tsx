import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "./ui/Button";

const Layout = () => {
  return (
    <>
      <nav className="border-b">
        <header className="max-w-7xl mx-auto flex flex-wrap justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <h1 className="text-xl font-bold text-center text-localiza-green sm:text-3xl">
              Gerenciador de Posts
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/posts/new">
              <Button>Novo Post</Button>
            </Link>
          </div>
        </header>
      </nav>
      <main className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
};

export default Layout;
