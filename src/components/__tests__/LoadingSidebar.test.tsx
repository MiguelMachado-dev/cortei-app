import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LoadingSidebar from "../LoadingSidebar";

describe("LoadingSidebar", () => {
  it("renders skeleton placeholders for the sidebar layout", () => {
    const { container } = render(<LoadingSidebar />);

    const root = container.firstElementChild;
    expect(root).not.toBeNull();
    expect(root).toHaveClass("max-w-sm");

    const animatedBlocks = container.querySelectorAll(".animate-pulse");
    expect(animatedBlocks.length).toBeGreaterThanOrEqual(2);
  });
});
