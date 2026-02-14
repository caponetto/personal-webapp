describe("i18n initialization", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("prefers persisted language before navigator when detecting language", async () => {
    const init = jest.fn();
    const use = jest.fn().mockReturnThis();

    jest.doMock("i18next", () => ({
      __esModule: true,
      default: { use, init },
    }));
    jest.doMock("i18next-browser-languagedetector", () => ({
      __esModule: true,
      default: {},
    }));
    jest.doMock("i18next-http-backend", () => ({
      __esModule: true,
      default: {},
    }));
    jest.doMock("react-i18next", () => ({
      __esModule: true,
      initReactI18next: {},
    }));

    await import("../index");

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        detection: {
          order: ["localStorage", "cookie", "navigator", "htmlTag"],
          caches: ["localStorage", "cookie"],
        },
      }),
    );
  });
});
