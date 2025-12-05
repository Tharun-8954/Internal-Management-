import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { seedInitialData } from "./lib/seed-data";

console.log("Main.tsx loaded");

// Seed initial data on first load
seedInitialData();

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (rootElement) {
  console.log("Creating React root and rendering App");
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found!");
}
