import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <nav className="border-b">
        <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <h1 className="text-3xl font-bold text-center text-blue-600">
              Gerenciador de Posts
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md">
              <Link to="/posts/new">Novo Post</Link>
            </button>
          </div>
        </header>
      </nav>
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
};

export default Layout;
