import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';
import { ApiResponse } from '../types';

const categoryService = new CategoryService();

export class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      
      const response: ApiResponse = {
        success: true,
        data: categories,
      };
      
      res.json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message,
      };
      res.status(500).json(response);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const category = await categoryService.getCategoryById(id);
      
      if (!category) {
        const response: ApiResponse = {
          success: false,
          error: 'Category not found',
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse = {
        success: true,
        data: category,
      };
      
      res.json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message,
      };
      res.status(500).json(response);
    }
  }
}