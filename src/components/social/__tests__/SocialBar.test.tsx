import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { usingTestingI18nContext } from "../../../jest/TestContextWrapper";
import { SocialBar, SocialUrls } from "../SocialBar";

describe("SocialBar", () => {
  const urls: SocialUrls = {
    github: "https://github.com/example",
    x: "https://x.com/example",
    linkedin: "https://linkedin.com/in/example",
  };

  it("should render all social links", () => {
    const { getByRole } = render(usingTestingI18nContext(<SocialBar urls={urls} />).wrapper);

    const githubLink = getByRole("link", { name: "Open github" });
    const xLink = getByRole("link", { name: "Open x" });
    const linkedinLink = getByRole("link", { name: "Open linkedin" });

    expect(githubLink).toHaveAttribute("href", urls.github);
    expect(xLink).toHaveAttribute("href", urls.x);
    expect(linkedinLink).toHaveAttribute("href", urls.linkedin);

    [githubLink, xLink, linkedinLink].forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("should not have basic accessibility violations", async () => {
    const { container } = render(usingTestingI18nContext(<SocialBar urls={urls} />).wrapper);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
