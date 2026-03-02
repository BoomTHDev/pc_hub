import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { anthenticate } from "../middlewares/anthenticate";

const router = Router();

// http://localhost:3001/categories
router.post("/", anthenticate, CategoryController.create);
router.get("/", CategoryController.findAll);
router.get("/:id", CategoryController.findById);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
