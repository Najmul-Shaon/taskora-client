/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";

const TaskEditForm = ({
  setIsViewEidtTask,
  editingTaskId,
  allTasksRefetch,
  taskType,
}) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const navigate = useNavigate();
  const [taskInfoForEdit, setTaskInfoForEdit] = useState({});
  // console.log(taskInfoForEdit);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axiosSecure
      .get(`/get/task/${editingTaskId}`)
      .then((res) => {
        setTaskInfoForEdit(res.data);
      })
      .catch(() => {
        // console.log(error);
      });
  }, [axiosSecure, editingTaskId]);

  useEffect(() => {
    if (taskInfoForEdit) {
      reset({
        taskTitle: taskInfoForEdit.title || "",
        taskDescription: taskInfoForEdit.description || "",
        deadline: taskInfoForEdit.deadline || "",
      });
    }
  }, [taskInfoForEdit, reset]);

  const onSubmit = async (data) => {
    const taskInfo = {
      user: user?.email,
      title: data?.taskTitle,
      description: data?.taskDescription,
      deadline: data?.deadline,
      editAt: new Date(),
      category: taskType,
    };
    axiosSecure
      .patch(`/patch/task/${editingTaskId}`, taskInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your task has been edited.",
            showConfirmButton: false,
            timer: 1000,
          });
          reset();
          setIsViewEidtTask(false);
          allTasksRefetch();
          // navigate("/");
        }
      })
      .catch(() => {
        // console.log(error);
      });
    // console.log(data);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-60">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setIsViewEidtTask(false)}
      ></div>
      <div className="relative p-4 bg-bgLight rounded-lg z-70">
        <p
          onClick={() => setIsViewEidtTask(false)}
          className="text-accentColor flex justify-end text-2xl cursor-pointer"
        >
          <IoCloseCircleOutline className="" />
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="text-textLight dark:text-textDark">Name</label>
            <input
              type="text"
              defaultValue={taskInfoForEdit?.title}
              placeholder="Task tile"
              className="input"
              {...register("taskTitle", { required: "Title is Required" })}
            />
            {errors.taskTitle && (
              <p className="text-accentColor text-sm mt-0.5">
                {errors.taskTitle.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-textLight dark:text-textDark">
              Description
            </label>
            <textarea
              className="textarea"
              defaultValue={taskInfoForEdit?.description}
              placeholder="Task description"
              {...register("taskDescription", {
                maxLength: {
                  value: 200,
                  message: "Task description not more than 200 character",
                },
              })}
            ></textarea>
            {errors.taskDescription && (
              <p className="text-accentColor text-sm mt-0.5">
                {errors.taskDescription.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-textLight dark:text-textDark">
              Deadline
            </label>
            <input
              type="date"
              defaultValue={taskInfoForEdit?.deadline}
              className="input"
              {...register("deadline", {
                required: "Deadline is Required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return (
                    selectedDate >= today || "Deadline cannot be in the past"
                  );
                },
              })}
            />
            {errors.deadline && (
              <p className="text-accentColor text-sm mt-0.5">
                {errors.deadline.message}
              </p>
            )}
          </div>

          <button className="btn w-full mt-3 bg-primaryLight border-none text-white">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskEditForm;
