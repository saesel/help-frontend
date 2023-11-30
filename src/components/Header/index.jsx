import { Link } from "react-router-dom";

import { AiOutlineUser } from "react-icons/ai";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b px-12 py-4">
      <Link to="/" className="text-4xl font-bold">
        HELP
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/login">Tarefas</Link>
          </li>
        </ul>
      </nav>
      <AiOutlineUser className="h-8 w-8" />
    </header>
  );
}
