import { SelectedDateContext } from "@/contexts/selectedDate/SelectedDateContext";
import { useContext } from "react";

const useSelectedDate = () => {
  const context = useContext(SelectedDateContext);
  if (!context) {
    throw new Error(
      "useSelectedDate must be used within a SelectedDateProvider",
    );
  }

  return context;
};

export default useSelectedDate;
