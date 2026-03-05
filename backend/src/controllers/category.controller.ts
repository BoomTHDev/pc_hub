import type { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import type { IdParam } from "../dto/category.dto";

export const CategoryController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const newCategory = await CategoryService.createCategory(body);
      res.json(newCategory);
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.findAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const category = await CategoryService.findById(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },

  // PUT http://localhost:3001/categories/:id (id in params (parameter))
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const updatedCategory = await CategoryService.updateCategory(id, body);
      res.json({
        message: `Updated ${updatedCategory.name} Category ID: ${updatedCategory.id}`,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const deletedCategory = await CategoryService.deleteCategory(id);
      res.json({ message: `Deleted Category ID ${deletedCategory.id}` });
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const removedCategory = await CategoryService.removeCategory(id);
      res.json({ message: `Removed Category ID ${removedCategory.id}` });
    } catch (error) {
      next(error);
    }
  },

  async restore(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const restoredCategory = await CategoryService.restoreCategory(id);
      res.json({ message: `Restored Category ID ${restoredCategory.id}` });
    } catch (error) {
      next(error);
    }
  },
};
