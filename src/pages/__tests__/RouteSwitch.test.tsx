import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { MemoryRouter } from "react-router-dom";
import { RouteSwitch } from "../RouteSwitch";

function mockPageModule(testId: string) {
  return {
    __esModule: true,
    default: () => <div data-testid={testId} />,
  };
}

jest.mock("../About/AboutPage", () => mockPageModule("about-route-page"));

jest.mock("../Journey/JourneyPage", () => mockPageModule("journey-route-page"));

jest.mock("../Text/TextPage", () => mockPageModule("text-route-page"));

jest.mock("../Talk/TalkPage", () => mockPageModule("talk-route-page"));

jest.mock("../Code/CodePage", () => mockPageModule("code-route-page"));

function renderRoute(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Suspense fallback={<div data-testid="route-loading" />}>
        <RouteSwitch />
      </Suspense>
    </MemoryRouter>,
  );
}

describe("RouteSwitch", () => {
  it("renders the expected page route", async () => {
    renderRoute("/talk");

    expect(await screen.findByTestId("talk-route-page")).toBeInTheDocument();
  });

  it("redirects unknown routes to about", async () => {
    renderRoute("/unknown-route");

    expect(await screen.findByTestId("about-route-page")).toBeInTheDocument();
  });
});
