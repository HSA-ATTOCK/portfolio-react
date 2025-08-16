// src/hooks/useBackendWakeup.js
import { useEffect } from "react";

const N8N_WEBHOOK_URL = "https://haider530.app.n8n.cloud/webhook/wake-backend";

export const useBackendWakeup = () => {
  useEffect(() => {
    const wakeBackend = async () => {
      try {
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            source: "portfolio-website",
            action: "wake-backend",
            page: window.location.pathname,
            userAgent: navigator.userAgent,
          }),
        });

        if (response.ok) {
          console.log("Backend wake-up successful");
        }
      } catch (err) {
        console.log("Backend wake-up failed:", err);
      }
    };

    // Call immediately
    wakeBackend();

    // Optional: Call again after 5 seconds to ensure it worked
    const timeoutId = setTimeout(wakeBackend, 5000);

    return () => clearTimeout(timeoutId);
  }, []);
};
