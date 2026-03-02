import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.get("/", ProductController.findAll);
router.post("/", authenticate, authorize("ADMIN"), ProductController.create);

export default router;
