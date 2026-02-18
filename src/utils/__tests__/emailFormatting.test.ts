import { obfuscateEmailAddress } from "../emailFormatting";

describe("obfuscateEmailAddress", () => {
  it("formats email with [at] and [dot]", () => {
    expect(obfuscateEmailAddress("hey@caponetto.dev")).toBe("hey [at] caponetto [dot] dev");
  });

  it("handles missing domain gracefully", () => {
    expect(obfuscateEmailAddress("hey")).toBe("hey [at]");
  });
});
