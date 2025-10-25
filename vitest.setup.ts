import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Ensure DOM is reset between tests to avoid leakage across cases.
afterEach(() => {
  cleanup();
});
