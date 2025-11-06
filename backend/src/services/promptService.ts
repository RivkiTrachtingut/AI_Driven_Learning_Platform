import prisma from '../models/database';
import { CreatePromptRequest } from '../types';
import { OpenAIService } from './openaiService';

export class PromptService {
  private openaiService = new OpenAIService();

  async createPrompt(promptData: CreatePromptRequest) {
    // Get category and subcategory names for AI context
    const category = await prisma.category.findUnique({
      where: { id: promptData.categoryId },
    });
    
    const subCategory = await prisma.subCategory.findUnique({
      where: { id: promptData.subCategoryId },
    });

    if (!category || !subCategory) {
      throw new Error('Category or SubCategory not found');
    }

    // Generate AI response
    const aiResponse = await this.openaiService.generateLesson(
      category.name,
      subCategory.name,
      promptData.prompt
    );

    // Save to database
    return await prisma.prompt.create({
      data: {
        ...promptData,
        response: aiResponse,
      },
      include: {
        user: true,
        category: true,
        subCategory: true,
      },
    });
  }

  async getPromptsByUserId(userId: number) {
    return await prisma.prompt.findMany({
      where: { userId },
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllPrompts() {
    return await prisma.prompt.findMany({
      include: {
        user: true,
        category: true,
        subCategory: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}