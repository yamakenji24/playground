import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

async function prepareApp() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("~/mocks/browser");
    return worker.start();
  }
  return Promise.resolve();
}

prepareApp().then(() => {
  startTransition(() => {
    hydrateRoot(
      document,
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
    );
  });
});
