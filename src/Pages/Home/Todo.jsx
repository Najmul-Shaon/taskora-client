/* eslint-disable react/prop-types */
import { FaPlus } from "react-icons/fa6";
import { RiListCheck3 } from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

const Todo = ({ setIsViewAddTask }) => {
  const [localToDos, setLocalToDos] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: toDos = [], refetch: toDosRefetch } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get/tasks?email=${user?.email}&category=to-do`
      );
      return res.data;
    },
  });
  // toDosRefetch();

  useEffect(() => {
    if (toDos.length > 0) {
      setLocalToDos(toDos);
    }
  }, [toDos]);

  // Sensors for desktop & mobile
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const onDragStart = (event) => {
    const task = localToDos.find((todo) => todo.order === event.active.id);
    setActiveTask(task);
  };

  const onDragOver = (event) => {
    console.log(event);
    const { active, over } = event;
    // setActiveTask(null);

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = localToDos.findIndex((todo) => todo.order === active.id);
    const newIndex = localToDos.findIndex((todo) => todo.order === over.id);

    if (oldIndex !== newIndex) {
      setLocalToDos((prev) => arrayMove(prev, oldIndex, newIndex));
    }

    // const updatedTodos = arrayMove(localToDos, oldIndex, newIndex);

    // console.log(localToDos);
    // console.log(updatedTodos);
    // setLocalToDos(updatedTodos);
  };

  const onDragEnd = () => {
    setActiveTask(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-textLight dark:text-textDark text-2xl my-3 flex items-center gap-2">
          <RiListCheck3 />
          <span>To-do</span>
        </h3>
        <span
          onClick={() => setIsViewAddTask(true)}
          className="flex items-center gap-1 text-lg bg-accentColor p-1 rounded-lg text-white cursor-pointer"
        >
          <FaPlus />
          Add Task
        </span>
      </div>
      <div className="space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={localToDos}
            strategy={verticalListSortingStrategy}
          >
            {localToDos.map((todo) => (
              <TaskCard
                key={todo._id}
                taskInfo={todo}
                setIsViewAddTask={setIsViewAddTask}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeTask ? (
              <TaskCard
                taskInfo={activeTask}
                setIsViewAddTask={setIsViewAddTask}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Todo;
