/* eslint-disable react/prop-types */
import { MdTaskAlt } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import { closestCenter, DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Done = ({ setIsViewAddTask }) => {
  const { user } = useAuth();
  const [localDone, setLocalDone] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: done = [], refetch: inDoneRefetch } = useQuery({
    queryKey: ["done"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get/tasks?email=${user?.email}&category=done`
      );
      return res.data;
    },
  });

  // inDoneRefetch();

  useEffect(() => {
    if (done.length > 0) {
      setLocalDone(done);
    }
  }, [done]);
  const onDragStart = (event) => {
    const task = localDone.find((todo) => todo.order === event.active.id);
    setActiveTask(task);
  };

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

  const onDragOver = (event) => {
    console.log(event);
    const { active, over } = event;
    // setActiveTask(null);

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = localDone.findIndex((todo) => todo.order === active.id);
    const newIndex = localDone.findIndex((todo) => todo.order === over.id);

    if (oldIndex !== newIndex) {
      setLocalDone((prev) => arrayMove(prev, oldIndex, newIndex));
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
      <h3 className="text-textLight dark:text-textDark text-2xl my-3 flex items-center gap-2">
        <MdTaskAlt />
        <span>Done</span>
      </h3>
      <div className="space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={localDone}
            strategy={verticalListSortingStrategy}
          >
            {localDone.map((singleDone) => (
              <TaskCard
                key={singleDone._id}
                taskInfo={singleDone}
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

export default Done;
