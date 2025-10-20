import { useState } from "react";
import TimeSelectGroup, { type Items } from "../../components/TimeSelectGroup";
import Sidebar from "./components/Sidebar";

const Home = () => {
  const [value, setValue] = useState<string | null>(null);
  const items: Items = [
    {
      label: "09:00",
      value: "09:00",
      isDisabled: true,
    },
    {
      label: "10:00",
      value: "10:00",
      isDisabled: false,
    },
    {
      label: "11:00",
      value: "11:00",
      isDisabled: false,
    },
  ];

  return (
    <div className="font-catamaran flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-800 antialiased">
      <Sidebar />
      <TimeSelectGroup
        items={items}
        value={value}
        onChange={setValue}
        name="time"
      />
    </div>
  );
};

export default Home;
