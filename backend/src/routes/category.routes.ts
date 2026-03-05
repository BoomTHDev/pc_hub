import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate";
import {
  CreateCategoryDto,
  IdParamDto,
  UpdateCategoryDto,
} from "../dto/category.dto";

const router = Router();

// http://localhost:3001/categories
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(CreateCategoryDto),
  CategoryController.create,
);

router.get("/", CategoryController.findAll);

router.get("/:id", validate(IdParamDto, "params"), CategoryController.findById);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(IdParamDto, "params"),
  validate(UpdateCategoryDto),
  CategoryController.update,
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(IdParamDto, "params"),
  CategoryController.delete,
);

router.delete(
  "/remove/:id",
  authenticate,
  authorize("ADMIN", "EMPLOYEE"),
  validate(IdParamDto, "params"),
  CategoryController.remove,
);

router.put(
  "/restore/:id",
  authenticate,
  authorize("ADMIN"),
  validate(IdParamDto, "params"),
  CategoryController.restore,
);

export default router;
