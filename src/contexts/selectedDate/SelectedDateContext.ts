import { createContext } from "react";

type SelectedDateContextType = {
  date: Date | undefined,
  setDate: (date: Date | undefined) => void
}

export const SelectedDateContext = createContext<SelectedDateContextType | undefined>(undefined);
