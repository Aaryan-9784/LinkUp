import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { config } from "../config/env.js";

if (!config.arcjetKey) {
  console.warn('⚠️ ARCJET_KEY not set — Arcjet protection will be skipped');
}

// Use DRY_RUN in development so rules log but never block.
// Switch to LIVE in production for real enforcement.
const ruleMode = config.isDevelopment() ? "DRY_RUN" : "LIVE";

const aj = config.arcjetKey ? arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: config.arcjetKey,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: ruleMode }),
    // Create a bot detection rule
    detectBot({
      mode: ruleMode, // DRY_RUN in development, LIVE in production
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a sliding window rate limit. Other algorithms are supported.
    // Increased limits for better user experience while still preventing abuse
    slidingWindow({
      mode: ruleMode, // DRY_RUN in development, LIVE in production
      max: 500, // 500 requests per IP address per window (more generous for legitimate users)
      interval: 60, // 60 second window
    }),
  ],
}) : null;

export default aj;