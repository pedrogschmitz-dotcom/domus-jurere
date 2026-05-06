import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { initAnalytics, reportWebVitals, trackPageView } from "./lib/analytics";
import "./index.css";

initAnalytics();
trackPageView(typeof window !== "undefined" ? window.location.pathname : "/");
reportWebVitals();

const root = createRoot(document.getElementById("root")!);
root.render(
  <ErrorBoundary>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ErrorBoundary>
);

// Signal to the pre-renderer (build-time) that the app is ready
if (typeof document !== "undefined") {
  // Wait a tick so React has committed
  requestAnimationFrame(() => {
    document.dispatchEvent(new Event("render-event"));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("render-event"));
    }
  });
}
