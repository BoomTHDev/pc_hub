import type { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";

export const ProductController = {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.findAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const newProduct = await ProductService.createProduct(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const updatedProduct = await ProductService.updateProduct(id, body);
      res.json({
        message: `Updated ${updatedProduct.name} Product ID: ${updatedProduct.id}`,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const deletedProduct = await ProductService.softDeleteProduct(id);
      res.json({ message: `Deleted Product ID ${deletedProduct.id}` });
    } catch (error) {
      next(error);
    }
  },
};
