import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header>
        <Link to="/">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Gerenciador de Posts
          </h1>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default Layout;
