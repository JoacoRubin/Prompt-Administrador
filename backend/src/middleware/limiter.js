import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  limit: 15, // 15 intentos
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ success: false, error: "Demasiadas peticiones, por favor, intentalo luego" })
  }
})

export { limiter }