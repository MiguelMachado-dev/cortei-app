import Sidebar from "./components/Sidebar";

const Home = () => {
  return (
    <div className="font-catamaran flex h-screen flex-col gap-4 bg-gray-800 p-3 antialiased">
      <Sidebar />
    </div>
  );
};

export default Home;
