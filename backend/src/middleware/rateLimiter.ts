import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // Limit each IP to 30 requests per `window` (here, per 5 minutes).
  message: {
    message: "too many request",
  },
});
