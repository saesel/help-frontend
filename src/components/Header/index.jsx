import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const logoutUser = () => {
    localStorage.removeItem("loggedUser");
    window.location.reload();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between border-b bg-white px-12 py-4">
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
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <AiOutlineUser
            size={32}
            className="cursor-pointer"
            onClick={toggleDropdown}
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <button
                onClick={logoutUser}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                role="menuitem"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
