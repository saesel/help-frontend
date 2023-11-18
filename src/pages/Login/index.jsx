import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import NotificationModal from "../../components/Modal/NotificationModal";

export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const checkIfUserIsLogged = () => {
    const loggedUser = localStorage.getItem("loggedUser");
    return loggedUser ? JSON.parse(loggedUser) : null;
  };

  const handleLogin = (event) => {
    try {
      event.preventDefault();

      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      const users = getUsersFromLocalStorage();

      const user = users.find(
        (user) => user.username === username && user.password === password,
      );

      if (!user) {
        setErrorModalVisible(true);
        throw new Error("Usuário ou senha inválidos ou não encontrados.");
      }

      localStorage.setItem("loggedUser", JSON.stringify(user));

      window.location.href = "/";
    } catch (error) {
      console.error("Ocorreu um erro ao logar:", error);
    }
  };

  useEffect(() => {
    const loggedUser = checkIfUserIsLogged();

    if (loggedUser) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (errorModalVisible) {
      setTimeout(() => {
        setErrorModalVisible(false);
      }, 3000);
    }
  }, [errorModalVisible]);

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="relative flex min-w-[400px] max-w-md flex-col gap-4 rounded bg-white px-8 py-12 shadow"
      >
        <h1 className="mb-8 text-center text-3xl font-bold">HELP</h1>
        <input
          id="name"
          type="text"
          placeholder="usuário"
          ref={usernameRef}
          required
          className="mb-5 rounded bg-gray-100 p-4 text-center text-sm outline-none focus:bg-gray-200 focus:ring-2 focus:ring-blue-600 focus:placeholder:invisible"
        />
        <input
          id="password"
          type="password"
          placeholder="senha"
          ref={passwordRef}
          required
          className="mb-5 rounded bg-gray-100 p-4 text-center text-sm outline-none focus:bg-gray-200 focus:ring-2 focus:ring-blue-600 focus:placeholder:invisible"
        />
        <div className="mb-12 flex flex-col gap-1">
          <p className="text-center text-sm">Não possui uma conta?</p>
          <Link
            to="/cadastrar"
            className="text-center text-sm font-bold uppercase text-blue-500 hover:text-blue-600"
          >
            Cadastrar-se
          </Link>
        </div>
        <button
          type="submit"
          className="absolute bottom-0 left-0 w-full rounded-b bg-blue-500 p-4 text-white transition-colors hover:bg-blue-600"
        >
          Logar
        </button>
        {errorModalVisible && (
          <NotificationModal
            message={"Usuário ou senha inválidos. Por favor, tente novamente."}
          />
        )}
      </form>
    </div>
  );
}
