import { Link, useLocation, useNavigate } from "react-router-dom";
import signInImg from "../../assets/login.svg";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    login(data?.userMail, data?.password).then((res) => {
      const user = res.user;
      console.log(user);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome Back!",
        showConfirmButton: false,
        timer: 1000,
      });
      reset();
      navigate(from, { replace: true });
    });
    console.log(data);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        const userInfo = {
          userEmail: res.user.email,
          userName: res.user.displayName,
          userImg: res.user.photoURL,
          createdAt: new Date(),
        };
        axiosPublic
          .post("/create-user", userInfo)
          .then((res) => {
            console.log();
            if (
              res.data.insertedId ||
              res.data.message === "User already exists"
            ) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Welcome to Taskora!!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(from, { replace: true });
            }
          })
          .catch(() => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Opps! An error occured.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Opps! An error occured.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="flex items-center justify-center flex-col md:flex-row">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2">
        <h3 className="text-4xl font-bold text-primaryLight">Taskora</h3>
        <h3>Let&apos;s Management Better</h3>
        <img className="w-[350px]" src={signInImg} alt="" />
      </div>

      <div className=" bg-secondaryLight min-h-screen w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="text-white text-5xl font-bold mb-12">Log In</div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        <div className="divider divider-warning text-white">Or</div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* user email section  */}
          <div>
            <label className="text-textLight dark:text-textDark">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              {...register("userMail", { required: "Email is Required" })}
            />
            {errors.userMail && (
              <p className="text-accentColor text-sm mt-0.5">
                {errors.userMail.message}
              </p>
            )}
          </div>
          {/* password section  */}
          <div>
            <label className="text-textLight dark:text-textDark">
              Password
            </label>
            <input
              type="password"
              placeholder="******"
              className="input"
              {...register("password", {
                required: "Password is required",
                maxLength: {
                  value: 20,
                  message: "Password not more than 20 character",
                },
                minLength: {
                  value: 6,
                  message: "Password not less than 6 characted",
                },
                pattern: {
                  value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/,
                  message:
                    "Password must contain one number, one uppercase, one lowercase and one special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-accentColor text-sm mt-0.5">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className="btn w-full mt-3 bg-primaryLight border-none text-white">
            Log In
          </button>
        </form>
        <p className="mt-2">
          New here?{" "}
          <Link to="/sign-up" className="text-accentColor">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
