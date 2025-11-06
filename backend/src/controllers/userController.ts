import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { ApiResponse, CreateUserRequest } from '../types';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const userData: CreateUserRequest = req.body;
      const user = await userService.createUser(userData);
      
      const response: ApiResponse = {
        success: true,
        data: user,
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

  async loginOrRegister(req: Request, res: Response) {
    try {
      const userData: CreateUserRequest = req.body;
      const result = await userService.loginOrRegister(userData);
      
      const response: ApiResponse = {
        success: true,
        data: {
          user: result.user,
          isNewUser: result.isNewUser,
          message: result.isNewUser ? 'User registered successfully!' : 'Welcome back!'
        },
      };
      
      res.status(result.isNewUser ? 201 : 200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message,
      };
      res.status(400).json(response);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.getUserById(id);
      
      if (!user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not found',
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse = {
        success: true,
        data: user,
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

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      
      const response: ApiResponse = {
        success: true,
        data: users,
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