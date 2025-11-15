// src/hooks/useBackendWakeup.js
import { useEffect } from "react";

const N8N_WEBHOOK_URL = "https://webauto0.app.n8n.cloud/webhook/wake-backend";

export const useBackendWakeup = () => {
  useEffect(() => {
    const wakeBackend = () => {
      try {
        // Method 1: Image pixel trick (bypasses CORS completely)
        const img = new Image();
        const params = new URLSearchParams({
          timestamp: new Date().toISOString(),
          source: "portfolio-website",
          action: "wake-backend",
          page: window.location.pathname,
          userAgent: navigator.userAgent.substring(0, 50), // Truncate to avoid URL length issues
          t: Date.now(), // Cache buster
        });

        img.src = `${N8N_WEBHOOK_URL}?${params.toString()}`;

        img.onload = () => {
          console.log("Backend wake-up successful");
        };

        img.onerror = () => {
          console.log(
            "Backend wake-up request sent (response not readable due to CORS)"
          );
        };

        // Clean up after 5 seconds
        setTimeout(() => {
          img.src = "";
        }, 5000);
      } catch (err) {
        console.log("Backend wake-up failed:", err);
      }
    };

    // Call immediately
    wakeBackend();

    // Optional: Call again after 10 seconds to ensure it worked
    const timeoutId = setTimeout(wakeBackend, 10000);

    return () => clearTimeout(timeoutId);
  }, []);
};
