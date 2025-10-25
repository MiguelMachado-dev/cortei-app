import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";
import "./styles/global.css";
import { SelectedDateProvider } from "./contexts/selectedDate/SelectedDateProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectedDateProvider initialDate={new Date()}>
      <Home />
    </SelectedDateProvider>
  </StrictMode>,
);
