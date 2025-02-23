import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

// eslint-disable-next-line react/prop-types
const TaskAddForm = ({ setIsViewAddTask }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const taskInfo = {
      user: user?.email,
      title: data?.taskTitle,
      description: data?.taskDescription,
      deadline: data?.deadline,
      createdAt: new Date(),
      category: "to-do",
    };
    axiosSecure
      .post("/post/task", taskInfo)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your task has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          setIsViewAddTask(false);
          navigate("/");
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
        onClick={() => setIsViewAddTask(false)}
      ></div>
      <div className="relative p-4 bg-bgLight rounded-lg z-70">
        <p
          onClick={() => setIsViewAddTask(false)}
          className="text-accentColor flex justify-end text-2xl cursor-pointer"
        >
          <IoCloseCircleOutline className="" />
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="text-textLight dark:text-textDark">Name</label>
            <input
              type="text"
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskAddForm;
