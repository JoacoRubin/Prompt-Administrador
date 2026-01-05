import { Router } from "express"
import { login, register, forgotPassword, resetPassword, verifyEmail } from "../controllers/authController.js"

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/verify-email/:token", verifyEmail)
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password", resetPassword)

export { authRouter }