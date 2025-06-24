// Add this to your main index.js to suppress error logs from third-party scripts
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("Minified React error")) {
    return;
  }
  originalConsoleError.apply(console, args);
};
