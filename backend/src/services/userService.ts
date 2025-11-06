import prisma from '../models/database';
import { CreateUserRequest } from '../types';

export class UserService {
  async createUser(userData: CreateUserRequest) {
    return await prisma.user.create({
      data: userData,
    });
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        prompts: {
          include: {
            category: true,
            subCategory: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        prompts: {
          include: {
            category: true,
            subCategory: true,
          },
        },
      },
    });
  }
}