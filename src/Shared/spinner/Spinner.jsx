import { Triangle } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#008080"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Spinner;
