import ReactDOM from "react-dom/client";
import { App } from "./App";

const app = document.getElementById("app");
if (!app) {
  throw new Error("Missing app container - check index.html.");
}
ReactDOM.createRoot(app).render(<App />);
