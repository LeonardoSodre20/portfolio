import { render, screen } from "@testing-library/react";
import { Process } from "@/components/sections/Process";
import { PROCESS_STEPS } from "@/constants/process";

describe("Process", () => {
  it("a lista ordenada só tem itens de lista como filhos diretos", () => {
    render(<Process />);
    const list = screen.getByRole("list");
    expect(list.children.length).toBe(PROCESS_STEPS.length);
    Array.from(list.children).forEach((child) => expect(child.tagName).toBe("LI"));
  });
});
