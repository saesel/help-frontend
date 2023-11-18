import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import idGenerator from "../../utils/idGenerator";
import { validatePassword, validateUsername } from "../../utils/validations";

import NotificationModal from "../../components/Modal/NotificationModal";

export default function Register() {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem("users");

    return users ? JSON.parse(users) : [];
  };

  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const checkIfUserIsLogged = () => {
    const loggedUser = localStorage.getItem("loggedUser");

    return loggedUser ? JSON.parse(loggedUser) : null;
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();

      const name = nameRef.current.value;
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      const isUsernameValid = validateUsername(username);
      const isPasswordValid = validatePassword(password);

      if (!isUsernameValid) {
        setErrorMessage(
          "O nome de usuário deve conter apenas letras e números, e deve ter entre 3 e 20 caracteres.",
        );
        throw new Error(
          "O nome de usuário deve conter apenas letras e números, e deve ter entre 3 e 20 caracteres.",
        );
      } else if (!isPasswordValid) {
        setErrorMessage(
          "A senha deve conter apenas letras e números, e deve ter entre 6 e 20 caracteres.",
        );
        throw new Error(
          "A senha deve conter apenas letras e números, e deve ter entre 6 e 20 caracteres.",
        );
      }

      const users = getUsersFromLocalStorage();

      if (users.find((user) => user.username === username)) {
        setErrorMessage("Usuário já cadastrado.");
        throw new Error("Usuário já cadastrado.");
      }

      const user = {
        id: idGenerator(),
        name,
        username,
        password,
      };

      users.push(user);

      saveUsersToLocalStorage(users);

      alert("Usuário cadastrado com sucesso.");

      window.location.href = "/login";
    } catch (error) {
      setErrorModalVisible(true);
      console.error("Ocorreu um erro ao cadastrar o usuário:", error);
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
        onSubmit={handleSubmit}
        className="relative flex min-w-[400px] max-w-md flex-col gap-4 rounded bg-white px-8 py-12 shadow"
      >
        <h1 className="mb-8 text-center text-3xl font-bold">HELP</h1>
        <input
          id="name"
          type="text"
          placeholder="nome completo"
          ref={nameRef}
          required
          className="mb-5 rounded bg-gray-100 p-4 text-center text-sm outline-none focus:bg-gray-200 focus:ring-2 focus:ring-blue-600 focus:placeholder:invisible"
        />
        <input
          id="username"
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
          <p className="text-center text-sm">Já possui uma conta?</p>
          <Link
            to="/login"
            className="text-center text-sm font-bold uppercase text-blue-500 hover:text-blue-600"
          >
            Logar
          </Link>
        </div>
        <button
          type="submit"
          className="absolute bottom-0 left-0 w-full rounded-b bg-blue-500 p-4 text-white transition-colors hover:bg-blue-600"
        >
          Cadastrar-se
        </button>
      </form>
      {errorModalVisible && <NotificationModal message={errorMessage} />}
    </div>
  );
}
