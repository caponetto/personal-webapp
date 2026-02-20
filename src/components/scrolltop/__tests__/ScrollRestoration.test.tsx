import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ScrollRestoration } from "../ScrollRestoration";

function RouteChangeButton() {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/next")}>next</button>;
}

describe("ScrollRestoration", () => {
  it("scrolls to top on initial render and on route change", () => {
    const scrollToSpy = jest.spyOn(globalThis, "scrollTo").mockImplementation(jest.fn());

    render(
      <MemoryRouter initialEntries={["/initial"]}>
        <ScrollRestoration />
        <Routes>
          <Route path="/initial" element={<RouteChangeButton />} />
          <Route path="/next" element={<div>next page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
    expect(scrollToSpy).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(screen.getByText("next page")).toBeInTheDocument();
    expect(scrollToSpy).toHaveBeenCalledTimes(2);

    scrollToSpy.mockRestore();
  });
});
