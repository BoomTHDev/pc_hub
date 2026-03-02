import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = Router();

// http://localhost:3001/categories
router.post("/", authenticate, authorize("ADMIN"), CategoryController.create);
router.get("/", CategoryController.findAll);
router.get("/:id", CategoryController.findById);
router.put("/:id", authenticate, authorize("ADMIN"), CategoryController.update);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  CategoryController.delete,
);
router.delete(
  "/remove/:id",
  authenticate,
  authorize("ADMIN", "EMPLOYEE"),
  CategoryController.remove,
);
router.put(
  "/restore/:id",
  authenticate,
  authorize("ADMIN"),
  CategoryController.restore,
);

export default router;
