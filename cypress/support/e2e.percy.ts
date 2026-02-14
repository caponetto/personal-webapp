import "./commands";
import { restorePercyEnvShim } from "./percyEnvShim";

// Keep allowCypressEnv disabled by shimming env access only during plugin init.
import "@percy/cypress";
restorePercyEnvShim();
