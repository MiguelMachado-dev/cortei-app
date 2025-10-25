import Schedule from "./components/Schedule";
import Sidebar from "./components/Sidebar";

const Home = () => {
  return (
    <div className="font-catamaran flex min-h-screen flex-col gap-6 bg-gray-800 p-4 antialiased sm:p-6 lg:flex-row lg:gap-6 lg:p-8">
      <Sidebar />

      <Schedule />
    </div>
  );
};

export default Home;
