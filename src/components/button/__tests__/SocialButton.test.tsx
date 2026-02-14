import GitHubIcon from "@mui/icons-material/GitHub";
import { render } from "@testing-library/react";
import { usingTestingI18nContext } from "../../../jest/TestContextWrapper";
import { SocialButton } from "../SocialButton";

describe("SocialButton", () => {
  it("should render an external-link icon button with label", () => {
    const { getByRole } = render(
      usingTestingI18nContext(<SocialButton label="github" icon={<GitHubIcon />} url="https://example.com" />).wrapper,
    );

    const button = getByRole("link", { name: "Open github" });
    expect(button).toHaveAttribute("href", "https://example.com");
    expect(button).toHaveAttribute("target", "_blank");
    expect(button).toHaveAttribute("rel", "noopener noreferrer");
  });
});
