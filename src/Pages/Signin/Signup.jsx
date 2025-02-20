import { Link } from "react-router-dom";
import signupImg from "../../assets/signup.svg";
const Signup = () => {
  return (
    <div className="flex items-center justify-center flex-col md:flex-row">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2">
        <h3 className="text-4xl font-bold text-primaryLight">Taskora</h3>
        <h3>Let&apos;s Management Better</h3>
        <img className="w-[350px]" src={signupImg} alt="" />
      </div>

      <div className=" bg-secondaryLight min-h-screen w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="text-white text-5xl font-bold mb-12">Sign Up</div>

        {/* Google */}
        <button className="btn bg-white text-black border-[#e5e5e5]">
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
        <form className="space-y-2">
          <div>
            <label className="text-textLight dark:text-textDark">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input"
            />
          </div>
          <div>
            <label className="text-textLight dark:text-textDark">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
            />
          </div>
          <div>
            <label className="text-textLight dark:text-textDark">Photo</label>
            <input type="file" className="file-input" />
          </div>
          <div>
            <label className="text-textLight dark:text-textDark">
              Password
            </label>
            <input type="password" placeholder="******" className="input" />
          </div>
          <button className="btn w-full mt-3 bg-primaryLight border-none text-white">
            Sign Up
          </button>
        </form>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/log-in" className="text-accentColor">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
