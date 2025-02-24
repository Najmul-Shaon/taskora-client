/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import BaseDnd from "./BaseDnd";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../Shared/spinner/Spinner";

const Dashboard = ({ setIsViewAddTask }) => {
  const [tasks, setTasks] = useState([]);
  // console.log(tasks);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: allTasks = [],
    refetch: allTasksRefetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/tasks?email=${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (allTasks.length > 0) {
      setTasks(allTasks);
    }
  }, [allTasks]);

  allTasksRefetch();

  // Function to update task category
  const updateTaskCategory = async (taskId, newCategory) => {
    // console.log(taskId, newCategory);

    await axiosSecure.patch(`/update/task/${taskId}`, {
      category: newCategory,
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <BaseDnd
      setIsViewAddTask={setIsViewAddTask}
      tasks={tasks}
      updateTaskCategory={updateTaskCategory}
      allTasksRefetch={allTasksRefetch}
    />
  );
};

export default Dashboard;
