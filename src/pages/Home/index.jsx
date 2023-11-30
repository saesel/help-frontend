import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import Header from "../../components/Header";
import TaskItem from "../../components/TaskItem";
import NewTaskModal from "../../components/Modal/NewTaskModal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storagedTasks = localStorage.getItem("tasks");

    if (storagedTasks) {
      const sortedTasks = sortTasksByDate(JSON.parse(storagedTasks));
      setTasks(sortedTasks);
    }
  }, []);

  const sortTasksByDate = (tasksArray) => {
    return tasksArray.sort(
      (a, b) => new Date(a.tasks[0].date) - new Date(b.tasks[0].date),
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    const sortedTasks = sortTasksByDate(updatedTasks);

    setTasks(sortedTasks);
    localStorage.setItem("tasks", JSON.stringify(sortedTasks));

    handleCloseModal();
  };

  const handleDelete = (name) => {
    const filteredTasks = tasks.filter((task) => task.tasks[0].name !== name);
    const sortedTasks = sortTasksByDate(filteredTasks);

    setTasks(sortedTasks);
    localStorage.setItem("tasks", JSON.stringify(sortedTasks));
  };

  return (
    <>
      <Header />
      <section className="m-auto w-10/12 py-4">
        <div className="border-b py-6">
          <h1 className="text-3xl font-medium">Lista de tarefas</h1>
        </div>
        <div className="py-8">
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-3 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            <AiOutlinePlus /> Nova tarefa
          </button>
        </div>
        <ul className="flex flex-col gap-4">
          {tasks.map(({ tasks }, index) => (
            <TaskItem
              key={index}
              name={tasks[0].name}
              category={tasks[0].category}
              date={tasks[0].date}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </section>

      {isModalOpen && (
        <NewTaskModal onClose={handleCloseModal} onAddTask={handleAddTask} />
      )}
    </>
  );
}
