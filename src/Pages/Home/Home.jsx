import { IoStatsChart } from "react-icons/io5";
import TotalStats from "./TotalStats";

const Home = () => {
  return (
    <div>
      <TotalStats />
      <h1 className="my-8 text-textLight dark:text-textDark font-semibold text-3xl flex items-center justify-center gap-2">
        <span>Workflow Overview</span>
        <IoStatsChart />
      </h1>
    </div>
  );
};

export default Home;
