import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const isLogged = localStorage.getItem("loggedUser");
    const pages = ["/login", "/cadastrar"];

    if (!isLogged && !pages.includes(window.location.pathname)) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
