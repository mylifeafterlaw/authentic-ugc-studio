// Google Analytics 4 (GA4) setup + lightweight click tracking.
//
// 1. Replace the placeholder below with your real GA4 Measurement ID.
//    Find it in GA Admin → Data Streams → your web stream (looks like G-XXXXXXXXXX).
//    This ID is a public/publishable value, so it is safe to keep in the codebase.
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

const isConfigured = () =>
  typeof GA_MEASUREMENT_ID === "string" &&
  GA_MEASUREMENT_ID.startsWith("G-") &&
  GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Injects the GA4 script once and configures the property.
export const initAnalytics = () => {
  if (typeof window === "undefined") return;
  if (!isConfigured()) {
    // No real ID yet — events are logged to the console so you can verify wiring.
    console.info("[analytics] GA4 not configured yet — set GA_MEASUREMENT_ID in src/lib/analytics.ts");
    return;
  }
  if (document.getElementById("ga4-script")) return;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
};

// Tracks a button/CTA click. `label` identifies which button was clicked,
// `location` identifies where on the page it lives (e.g. "hero", "navbar").
export const trackClick = (label: string, location?: string) => {
  const params = { event_category: "cta", event_label: label, location };
  if (typeof window !== "undefined" && typeof window.gtag === "function" && isConfigured()) {
    window.gtag("event", "cta_click", params);
  } else {
    console.info("[analytics] cta_click", params);
  }
};
