import { useState } from "react";
import { AiOutlineCalendar, AiOutlineDelete } from "react-icons/ai";

import { dataFormatter } from "../../utils/dataFormatter";

// eslint-disable-next-line react/prop-types
export default function TaskItem({ name, category, date, onDelete }) {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleDelete = () => {
    onDelete(name);
  };

  return (
    <li
      className={`flex items-start gap-3 rounded border bg-white p-4 shadow-sm transition-colors hover:bg-gray-50 ${
        isChecked ? "text-gray-500 line-through" : ""
      }`}
    >
      <input
        className="mt-0.5 h-5 w-5 appearance-none rounded border border-gray-300 checked:border-transparent checked:bg-blue-500 focus:outline-none"
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <p className="font-medium">{name}</p>
          <AiOutlineDelete
            size="20"
            className="cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        <span className="flex items-center gap-2 text-sm text-gray-500">
          <AiOutlineCalendar />
          {dataFormatter(date)}
        </span>
        <span className="text-sm">{category}</span>
      </div>
    </li>
  );
}
