import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-6 px-8">
      <div className="col-span-2 bg-bgLight dark:bg-bgDark min-h-screen">
        <NavBar />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
