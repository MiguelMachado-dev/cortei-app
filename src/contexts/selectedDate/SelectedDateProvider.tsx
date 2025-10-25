import { useState } from "react";
import { SelectedDateContext } from "./SelectedDateContext";

type SelectedDateProviderProps = {
  children: React.ReactNode;
  initialDate?: Date;
};

export const SelectedDateProvider = ({
  children,
  initialDate,
}: SelectedDateProviderProps) => {
  const [date, setDate] = useState<Date | undefined>(initialDate);

  const value = {
    date,
    setDate,
  };

  return (
    <SelectedDateContext.Provider value={value}>
      {children}
    </SelectedDateContext.Provider>
  );
};
