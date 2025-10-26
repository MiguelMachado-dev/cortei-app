import Schedule from "./components/Schedule";
import Sidebar from "./components/Sidebar";

const Home = () => {
  return (
    <div className="font-catamaran flex min-h-screen flex-col gap-6 antialiased lg:h-screen lg:flex-row lg:gap-8 p-4 lg:p-8">
      <div className="lg:w-[400px] xl:w-[480px] lg:flex-shrink-0">
        <Sidebar />
      </div>
      
      <div className="flex-1 min-w-0">
        <Schedule />
      </div>
    </div>
  );
};

export default Home;
