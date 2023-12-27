import express from "express";
import { registerController, loginController, userDetailsUpdateController } from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/user-details-update",requireSignIn,userDetailsUpdateController)

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

export default router;