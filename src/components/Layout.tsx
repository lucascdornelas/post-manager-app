import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "./ui/Button";
import useThemeStore from "../store/themeStore";
import { MoonIcon, SunIcon } from "lucide-react";

const Layout = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-background dark:bg-gray-600 text-foreground dark:text-white">
        <nav className="border-b">
          <header className="max-w-7xl mx-auto flex flex-wrap justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
            <Link to="/">
              <h1 className="text-xl font-bold text-center text-localiza-green dark:text-dark-localiza-text sm:text-3xl">
                Gerenciador de Posts
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/posts/new">
                <Button>Novo Post</Button>
              </Link>
              <Button size="lg" onClick={toggleTheme}>
                {theme === "light" ? (
                  <MoonIcon size={16} />
                ) : (
                  <SunIcon size={16} />
                )}
              </Button>
            </div>
          </header>
        </nav>
        <main className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Layout;
