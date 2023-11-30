import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function NewTaskModal({ onClose, onAddTask }) {
  const [newTask, setNewTask] = useState({
    userId: "",
    tasks: [{ name: "", category: "", date: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prevState) => ({
      ...prevState,
      tasks: [{ ...prevState.tasks[0], [name]: value }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddTask(newTask);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[400px] rounded-md bg-white p-8">
        <h2 className="mb-4 text-2xl font-semibold">Nova Tarefa</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-500"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newTask.tasks[0].name}
              onChange={handleChange}
              className="my-1 w-full rounded bg-gray-100 p-4 text-sm outline-none focus:bg-gray-200 focus:ring-2 focus:ring-blue-600 focus:placeholder:invisible"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-500"
            >
              Categoria
            </label>
            <select
              name="category"
              id="category"
              value={newTask.tasks[0].category}
              onChange={handleChange}
              className="mt-1 w-full rounded bg-gray-100 p-4 text-sm outline-none focus:bg-gray-200 focus:ring-2 focus:ring-blue-600 focus:placeholder:invisible"
            >
              <option value="" disabled>
                {" "}
                Selecione uma categoria{" "}
              </option>
              <option value="Trabalho">Pessoal</option>
              <option value="Estudos">Estudos</option>
              <option value="Casa">Trabalho</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-500"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={newTask.tasks[0].date}
              onChange={handleChange}
              className="mt-1 w-full rounded bg-gray-100 p-4 text-sm outline-none focus:bg-gray-200 focus:ring-2 focus:ring-blue-600 focus:placeholder:invisible"
              required
            />
          </div>
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-6 py-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
