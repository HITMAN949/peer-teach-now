import * as Sentry from "@sentry/browser";

export function initSentry() {
  // Only initialize if we have a DSN
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      release: import.meta.env.VITE_APP_VERSION,
      debug: import.meta.env.DEV, // Enable debug mode in development
    });
  }
} 