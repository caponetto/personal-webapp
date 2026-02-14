type EnvFn = (key?: string) => unknown;
const originalEnv: EnvFn = Cypress.env.bind(Cypress);

const configEnv = (Cypress.config("env") ?? {}) as Record<string, unknown>;

Object.entries(configEnv).forEach(([key, value]) => Cypress.expose(key, value));

const readConfigEnv = (key?: string) => {
  if (!key) {
    return configEnv;
  }
  return configEnv[key];
};

Object.defineProperty(Cypress, "env", {
  configurable: true,
  value: readConfigEnv,
});

export function restorePercyEnvShim() {
  Object.defineProperty(Cypress, "env", {
    configurable: true,
    value: originalEnv,
  });
}
