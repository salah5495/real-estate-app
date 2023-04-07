import express from "express";
import * as auth from "../controllers/auth.js";
import { requireSignIn } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", requireSignIn, auth.welcome);
router.post("/pre-register", auth.preRegister);
router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/forgot-password", auth.forgotPassword);
router.post("/access-account", auth.accessAccount);
router.get("/refresh-token", auth.refreshToken);
router.get("/current-user", requireSignIn, auth.currentUser);
router.get("/profile/:username", auth.publicProfile);
router.put("/update-password", requireSignIn, auth.updatePassword);
router.put("/update-profile", requireSignIn, auth.updateProfile);

router.get("/agents", auth.agents);
router.get("/agent-ad-count/:_id", auth.agentAdCount);
router.get("/agent/:username", auth.agent);

export default router;
