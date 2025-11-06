import { Request, Response } from 'express';
import { PromptService } from '../services/promptService';
import { ApiResponse, CreatePromptRequest } from '../types';

const promptService = new PromptService();

export class PromptController {
  async createPrompt(req: Request, res: Response) {
    try {
      const promptData: CreatePromptRequest = req.body;
      const prompt = await promptService.createPrompt(promptData);
      
      const response: ApiResponse = {
        success: true,
        data: prompt,
      };
      
      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message,
      };
      res.status(400).json(response);
    }
  }

  async getPromptsByUserId(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const prompts = await promptService.getPromptsByUserId(userId);
      
      const response: ApiResponse = {
        success: true,
        data: prompts,
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

  async getAllPrompts(req: Request, res: Response) {
    try {
      const prompts = await promptService.getAllPrompts();
      
      const response: ApiResponse = {
        success: true,
        data: prompts,
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