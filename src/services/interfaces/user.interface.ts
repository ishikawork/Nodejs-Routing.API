import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import 'reflect-metadata';

export interface IUserService {
  findAllUser(): Promise<any>;
  findUserById(userId: string): Promise<any>;
  createUser(userData: CreateUserDto): Promise<any>;
  updateUser(userId: string, userData: UpdateUserDto): Promise<any>;
  deleteUser(userId: string): Promise<any>;
}
